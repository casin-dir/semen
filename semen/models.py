from django.contrib.auth.models import User
from django.db import models


class UserToken(models.Model):
    class Meta:
        verbose_name = 'токен пользователя'
        verbose_name_plural = 'токен пользователя'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_token', verbose_name='Пользователь')
    push_token = models.CharField(
        unique=True,
        max_length=255,
        default=None,
        verbose_name='Токен'
    )

# class Review(models.Model):
