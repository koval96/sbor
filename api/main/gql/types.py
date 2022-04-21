from graphene_django import DjangoObjectType

from main.models import ExtendedUser


class UserType(DjangoObjectType):
    class Meta:
        model = ExtendedUser


