import graphene
import graphql_jwt
import json

from main.models import ExtendedUser, Operation, Volunteer
from main.gql.types import OperationType, VolunteerType


class JoinOperation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID(required=True)

    operation = graphene.Field(OperationType)

    @classmethod
    def mutate(cls, root, info, username, id):
        user = ExtendedUser.objects.get(username=username)
        operation = Operation.objects.get(id=id)
        volunteer = Volunteer.objects.filter(user=user, operation=operation)
        if volunteer.count() > 0:
            volunteer = volunteer.all().first()
            if volunteer in user.operations.all():
                volunteer.delete()
        else:
            volunteer = Volunteer.objects.create(user=user, operation=operation)
            user.operations.add(volunteer)
            operation.volunteers.add(volunteer)
        
        return JoinOperation(operation=operation)

class ChangeVolunteerStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        status = graphene.String(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, id, status):
        volunteer = Volunteer.objects.get(id=id)
        volunteer.status = status
        volunteer.save()
        return ChangeVolunteerStatus(ok=True)

class OperationsMutations(graphene.ObjectType):
    join_operation = JoinOperation.Field()
    change_volunteer_status = ChangeVolunteerStatus.Field()
