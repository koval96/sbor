from graphene_django import DjangoObjectType

from main.models import ExtendedUser, Operation, Facility


class UserType(DjangoObjectType):
    class Meta:
        model = ExtendedUser

class OperationType(DjangoObjectType):
    class Meta:
        model = Operation

class FacilityType(DjangoObjectType):
    class Meta:
        model = Facility


