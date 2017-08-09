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


class FeedBack(models.Model):
    class Meta:
        verbose_name = 'отзыв'
        verbose_name_plural = 'отзывы'

    user_avatar = models.CharField(
        max_length=255,
        default='',
        verbose_name='Ссылка на аватар человека'
    )
    user_link = models.CharField(
        max_length=255,
        default='',
        verbose_name='Ссылка на аккаунт человека'
    )
    feedback_link = models.CharField(
        max_length=255,
        default='',
        verbose_name='Ссылка на отзыв'
    )
    feedback_image = models.CharField(
        max_length=255,
        default='',
        verbose_name='Ссылка на картинку'
    )
    user_nickname = models.CharField(
        max_length=255,
        default='',
        verbose_name='Никнейм'
    )
    feedback_likes = models.IntegerField(
        default=100,
        verbose_name='КОл-во лайков'
    )
    feedback_comments = models.IntegerField(
        default=10,
        verbose_name='Кол-во коментов'
    )
    feedback_text = models.CharField(
        max_length=5000,
        default='',
        verbose_name='Текст отзыва'
    )