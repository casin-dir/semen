from django.contrib.auth.models import User
from django_q.tasks import async

from crashes.models import Crash
from semen_iphone import settings
from .models import UserToken
import requests

url = 'https://fcm.googleapis.com/fcm/send'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'key=' + settings.FCM_KEY
}
body = {"notification": {
    "title": '',
    "body": '',
    "icon": "https://static1.squarespace.com/static/576b207637c581debf34f42a/588948263e00bed8ded8f508/5892178344024318dab707cc/1485969283970/GM+BW.JPG",
    "click_action": ""
}}


def send_push(user_id, title='', message='', path=''):
    users = UserToken.objects.filter(user_id=user_id)
    body['notification']['title'] = title
    body['notification']['body'] = message
    body['notification']['click_action'] = path

    for user in users:
        json = body
        json.update({'to': user.push_token})
        async(requests.post, url=url, json=json, headers=headers)

    return True


def push_dispatch(title='', message='', perm=None, path=''):
    users = User.objects.all()

    for user in users:
        if perm is None:
            send_push(user.id, title, message, path)
        elif user.has_perm(perm):
            send_push(user.id, title, message, path)

    return True

def total_cost(id):
    cost = 0
    crash = Crash.objects.get(id=id)
    rps = crash.rps.all()

    for rp in rps:
        cost += rp.cost

    # if crash.percent_cost != 0:
    #     cost += cost * crash.percent_cost / 100

    cost += crash.abs_cost
    return int(cost)


def total_time(id):
    time = 0
    crash = Crash.objects.get(id=id)
    rps = crash.rps.all()
    for rp in rps:
        time += rp.time_to_repair

    return int(time)

def total(crashes):
    cost = 0

    for crash in crashes:
        cost += total_cost(crash.id)

    return cost

def get_map(coords):
    if coords:
        return '/map?coord1={}&coord2={}'.format(coords[0],coords[1])
    else:
        return 'Не указано'
