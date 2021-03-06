from pydoc import describe
import graphene
import graphql_jwt
import json
from volounters_nn_bot.bot_commands import send_all_text
from volounters_nn_bot.bot import bot
from main.models import ExtendedUser, Facility, Operation, Volunteer
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
            volunteer = Volunteer.objects.create(
                user=user, operation=operation)
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

class ChangeOperationStatus(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        status = graphene.String(required=True)

    operation = graphene.Field(OperationType)

    @classmethod
    def mutate(cls, root, info, id, status):
        operation = Operation.objects.get(id=id)
        operation.status = status
        operation.save()
        return ChangeOperationStatus(operation=operation)

class ChangeFacility(graphene.Mutation):
    class Arguments:
        id_vol = graphene.ID(required=True)
        id_fac = graphene.ID(required=True)

    volunteers = graphene.List(VolunteerType)

    @classmethod
    def mutate(cls, root, info, id_vol, id_fac):
        volunteer = Volunteer.objects.get(id=id_vol)
        facility = Facility.objects.get(id=id_fac)
        if facility in volunteer.facilities.all():
            volunteer.facilities.remove(facility)
        else:
            volunteer.facilities.add(facility)

        volunteers = volunteer.operation.volunteers
        return ChangeFacility(volunteers=volunteers.all())


class CreateOperation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        name = graphene.String(required=True)
        age = graphene.Int(required=True)
        description = graphene.String(required=True)
        appearance = graphene.String(required=True)
        adress = graphene.String(required=True)
        coords = graphene.String(required=True)
        search_start = graphene.String(required=True)
        plan = graphene.String(required=True)
        image_url = graphene.String(required=True)

    id = graphene.Int()

    @classmethod
    def mutate(cls, root, info, username, name, description, appearance, adress, coords, search_start, plan, image_url, age):
        head = ExtendedUser.objects.get(username=username)
        operation = Operation.objects.create(name=name, description=description, appearance=appearance,
                                             adress=adress, coords=coords, search_start=search_start, plan=plan, image_url=image_url, age=age)
        volunteer = Volunteer.objects.create(user=head, status="???? ??????????????", operation=operation)
        head.operations.add(volunteer)
        operation.volunteers.add(volunteer)
        operation.head.add(head)
        text = f"???????????? ?????????????? \n ??????????????????: {appearance} \n ??????????: {adress} \n ???????????? ?????????????? {search_start}"
        send_all_text(bot=bot, text=text)
        return CreateOperation(id=operation.id)


class OperationsMutations(graphene.ObjectType):
    join_operation = JoinOperation.Field()
    change_volunteer_status = ChangeVolunteerStatus.Field()
    change_operation_status = ChangeOperationStatus.Field()
    create_operation = CreateOperation.Field()
    change_facility = ChangeFacility.Field()
