import graphene
import graphql_jwt
from main.models import ExtendedUser
from main.gql.types import UserType
from volounters_nn_bot.bot import bot
from volounters_nn_bot.bot_commands import send_all_text
from volounters_nn_bot.models import TelegramUser, TelegramChat


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Register(graphene.Mutation):

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, username, password, first_name, last_name,
               email, age, education, tg, phone):
        updates = bot.getUpdates()
        tg_id = '1'
        offset = None
        total_count = 0
        while len(updates) > 0:
            total_count += len(updates)
            for update in updates:
                bot.handle_update(update)
                offset = int(update.get_update_id()) + 1
            updates = bot.getUpdates(offset=offset)
        allTgUsers = TelegramUser.objects.all()
        for i in allTgUsers:
            if tg == i.username:
                tg_id = i.telegram_id
                print(i.username, i.telegram_id)

        # print(len(updates))
        # while len(updates) > 0:
        #     total_count += len(updates)
        #     for update in updates:
        #         bot.handle_update(update)
        #         a = update.get_user()
        #         chat = update.get_chat()
        #         print(a.get_username(), tg)
        #         if a.get_username() == tg:
        #             tg_id = str(chat.get_id())
        #         print(tg_id)
        #         offset = int(update.get_update_id()) + 1
        #     updates = bot.getUpdates(offset=offset)
        send_all_text(bot=bot, text="Это получилось")
        user = ExtendedUser.objects.create(username=username,
                                           first_name=first_name,
                                           last_name=last_name,
                                           email=email,
                                           age=age,
                                           tg=tg,
                                           tg_id=tg_id,
                                           phone=phone,
                                           education=education)
        user.set_password(password)
        user.save()
        return Register(ok=True)


class AuthMutations(graphene.ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revokeToken = graphql_jwt.Revoke.Field()
    register = Register.Field()
