import graphene

from main.models import ExtendedUser, Event
from main.gql.types import EventType


class JoinEvent(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID(required=True)

    event = graphene.Field(EventType)

    @classmethod
    def mutate(cls, root, info, username, id):
        user = ExtendedUser.objects.get(username=username)
        event = Event.objects.get(id=id)
        if event in user.events.all():
            user.events.remove(event)
        else:
            user.events.add(event)

        return JoinEvent(event=event)


class EventMutations(graphene.ObjectType):
    join_event = JoinEvent.Field()
