from main.models import ExtendedUser


def send_all_text(bot, text):
    users = ExtendedUser.objects.all()
    for i in users:
        bot.sendMessage(i.tg_id, text)