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

    if crash.percent_cost != 0:
        cost += cost * crash.percent_cost / 100

    cost += crash.abs_cost
    return int(cost)


def total_time(id):
    time = 0
    crash = Crash.objects.get(id=id)
    rps = crash.rps.all()
    for rp in rps:
        time += rp.time_to_repair

    return int(time)


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
        total_cost = self.total(crashes)
        order = Order(
            date=timezone.now(),
            device=crashes[0].device,
            address=self.get_map(data['coords']),
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
            cost += total_cost(crash.id)

        return cost

    def get_map(self,coords):
        if coords:
            return '/map?coord1={}&coord2={}'.format(coords[0],coords[1])
        else:
            return 'Не указано'


class MapView(View):
    def get(self,request):
        coord1 = self.request.GET['coord1']
        coord2 = self.request.GET['coord2']

        return render(request,'map.html',{'coord1':coord1,
                                          'coord2': coord2
                                          })
