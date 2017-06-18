from django.shortcuts import render
from django.views import View

from crashes.models import Crash
from devices.models import Device, Type


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
                con['models'].append({'name': device.name, 'crashes': ch})

        return render(request, 'index.html', context)
