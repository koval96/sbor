from django.contrib import admin
from volounters_nn_bot.models import TelegramUser, TelegramChat, TelegramState

admin.site.register(TelegramUser)
admin.site.register(TelegramChat)
admin.site.register(TelegramState)
