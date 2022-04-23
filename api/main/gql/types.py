from graphene_django import DjangoObjectType

from main.models import ExtendedUser, Operation, Facility, Volunteer


class UserType(DjangoObjectType):
    class Meta:
        model = ExtendedUser

class OperationType(DjangoObjectType):
    class Meta:
        model = Operation

class VolunteerType(DjangoObjectType):
    class Meta:
        model = Volunteer

class FacilityType(DjangoObjectType):
    class Meta:
        model = Facility


