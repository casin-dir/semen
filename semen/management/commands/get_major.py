from datetime import datetime

from django.core.management import BaseCommand

from orders.models import Order


class Command(BaseCommand):
    help = 'Загрузить пользователей из ldap'

    def add_arguments(self, parser):
        parser.add_argument('percent', type=int)

    def handle(self, *args, **options):
        year = datetime.now().year
        month = datetime.now().month
        marj = 0
        orders = Order.objects.filter(status='DONE',date__year__gte=year,
                              date__year__lte=year)
        for order in orders:
            ordercost = 0
            if datetime.now().month == order.date.month:
                for crash in order.crashes.all():
                    ordercost += crash.abs_cost*options['percent']/100
                marj +=ordercost
                print('Заказ - {},{},{}. Мне и Рощину - {}'.format(order.name,order.date.strftime('%d.%m.%Y'),order.device,ordercost))

        print('Общая сумма навара - ',marj)

