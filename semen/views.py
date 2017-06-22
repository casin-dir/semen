import json

from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from crashes.models import Crash
from devices.models import Device, Type
from orders.models import Order


def total_cost(id):
    cost = 0
    crash = Crash.objects.get(id=id)
    rps = crash.rps.all()
    for rp in rps:
        cost += rp.cost
        pass
    if crash.percent_cost != 0:
        cost += cost * crash.percent_cost / 100
    cost += crash.abs_cost
    return cost

class Landing(View):
    def get(self, request):
        context = {'list': []}
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
                               'cost': total_cost(crash.id)})
                con['models'].append({'name': device.name, 'id': device.id, 'crashes': ch})

        return render(request, 'index.html', context)


class NewOrder(View):
    def post(self, request):
        data = json.loads(self.request.body.decode('utf8'))
        crashes = []

        for crash in data['crashes']:
            crashes.append(Crash.objects.get(id=crash))
        total_cost = self.total(crashes)
        order = Order(
            date=timezone.now(),
            device=Crash.objects.get(id=1).device,
            address=data['address'],
            phone=data['phone'],
            name=data['name'],
            travel_time=0,
            total_cost=total_cost,
            status='NEW'

        )
        order.save()
        for crash in crashes:
            order.crashes.add(crash)
        return HttpResponse(status=200)

    def total(self, crashes):
        cost = 0
        for crash in crashes:
            cost +=total_cost(crash.id)

        return cost
