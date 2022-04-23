import graphene
import graphql_jwt
from main.models import ExtendedUser
from main.gql.types import UserType


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
        age = graphene.Int(required=True)
        education = graphene.String(required=True)
        tg = graphene.String(required=True)
        phone = graphene.String(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, username, password, first_name, last_name, email, age, education, tg, phone):
        user = ExtendedUser.objects.create(
            username=username, first_name=first_name, last_name=last_name, email=email, age=age, tg=tg, phone=phone, education=education)
        user.set_password(password)
        user.save()
        return Register(ok=True)


class AuthMutations(graphene.ObjectType):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revokeToken = graphql_jwt.Revoke.Field()
    register = Register.Field()
