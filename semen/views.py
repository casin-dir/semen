import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.shortcuts import render, render_to_response
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
class TestComment(View):

    def get(self,request):
        insta = "<blockquote class=&quot;instagram-media&quot; data-instgrm-captioned data-instgrm-version=&quot;7&quot; style=&quot; background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);&quot;><div style=&quot;padding:8px;&quot;> <div style=&quot; background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;&quot;> <div style=&quot; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;&quot;></div></div> <p style=&quot; margin:8px 0 0 0; padding:0 4px;&quot;> <a href=&quot;https://www.instagram.com/p/BWiyPARlw4F/&quot; style=&quot; color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;&quot; target=&quot;_blank&quot;>мы, ночной пляж, Ксюшины *омномном*, вкусняшки в бутылочках и басы от ближайших клубов🌚 есть вещи, из-за которых каждый год хочется возвращаться💔</a></p> <p style=&quot; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;&quot;>Публикация от Liza Borisova (@l.boriska) <time style=&quot; font-family:Arial,sans-serif; font-size:14px; line-height:17px;&quot; datetime=&quot;2017-07-14T22:20:03+00:00&quot;>Июл 14 2017 в 3:20 PDT</time></p></div></blockquote> <script async defer src=&quot;//platform.instagram.com/en_US/embeds.js&quot;></script>"
        return render_to_response('feedback1.html')