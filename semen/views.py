import json

from django.shortcuts import render
from django.utils import timezone
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from crashes.models import Crash
from devices.models import Device, Type
from orders.models import Order
from repairparts.models import RepairParts


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
                               'url': crash.url})
                con['models'].append({'name': device.name, 'id':device.id,  'crashes': ch})

        return render(request, 'index.html', context)

class NewOrder(View):

    def post(self,request):
        data = json.loads(self.request.body.decode('utf8'))
        crashes = []



        for crash in data['crashes']:
            crashes.append(Crash.objects.get(id=crash))
            tot = self.total(crashes)
        order = Order.objects.create(
            date = timezone.now(),
            device = Crash.objects.get(id=1).device,
            crashes = crashes,
            address = data['address'],
            phone= data['phone'],
            name = data['name'],
            tracel_time = 0,

        )
        return {'ok':'ok'}

    def total(self,crashes):
        cost = 0
        for crash in crashes:
            crash = Crash.objects.get(id=crash.id)
            # rps = RepairParts.objects.filter(id__in=crash.rps)
            rps = Crash.rps.all()
            print(crash.rps)

