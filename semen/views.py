import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views import View

from crashes.models import Crash
from devices.models import Device, Type
from orders.models import Order
from semen.models import UserToken
from semen.utils import send_push, total_cost, total_time, get_map, total
from semen_iphone import settings


class Landing(View):
    def get(self, request):
        context = {'list': [],
                   'isLoggedIn': True if self.request.user.is_authenticated else False
                   }
        Device.objects.all()
        types = Type.objects.all()

        for type in types:
            context['list'].append(
                {'type': type,
                 'models': []}
            )

        for con in context['list']:
            devices = Device.objects.filter(type=con['type'])
            for device in devices:
                crashes = Crash.objects.filter(device=device)
                ch = []
                for crash in crashes:
                    ch.append({'name': crash.name,
                               'id': crash.id,
                               'url': crash.url,
                               'cost': total_cost(crash.id),
                               'time': total_time(crash.id)})
                con['models'].append({'name': device.name, 'id': device.id, 'crashes': ch})

        return render(request, 'index.html', context)


class NewOrder(View):
    def post(self, request):
        data = json.loads(self.request.body.decode('utf8'))
        crashes = []

        for crash in data['crashes']:
            crashes.append(Crash.objects.get(id=crash))
        total_cost = total(crashes)
        order = Order(
            date=timezone.now(),
            device=crashes[0].device,
            address=get_map(data['coords']),
            phone=data['phone'],
            name=data['name'],
            total_cost=total_cost,
            status='NEW'

        )
        order.save()
        text = ', '.join(str(e) for e in crashes)
        for user in User.objects.filter(is_superuser=True):
            send_push(user, 'Новая заявка - {}'.format(data['name']), '{}, {}'.format(crashes[0].device, text),
                      settings.SITE_URL + '/admin/orders/order/')

        for crash in crashes:
            order.crashes.add(crash)

        return HttpResponse(status=200)


class MapView(View):

    @method_decorator(login_required)
    def get(self, request):
        if self.request.GET['coord1']:
            coord1 = self.request.GET['coord1']
            coord2 = self.request.GET['coord2']

            return render(request, 'map.html', {'coord1': coord1,
                                            'coord2': coord2
                                            })
        else:
            return HttpResponseBadRequest


class TokenView(View):

    def post(self, *args, **kwargs):

        data = json.loads(self.request.body.decode('utf8'))

        if 'token' not in data:
            return HttpResponseBadRequest()

        token_value = data['token']

        try:
            UserToken.objects.get(push_token=token_value)
            response = JsonResponse({'status_code': 200, 'add': False})
        except UserToken.DoesNotExist:
            token = UserToken(user=self.request.user, push_token=token_value)
            token.save()

            response = JsonResponse({'status_code': 200, 'add': True})

        return response
