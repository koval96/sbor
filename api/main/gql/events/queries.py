import graphene

from main.gql.types import EventType
from main.models import Operation, Event

class EventQueries(graphene.ObjectType):
    get_all_events = graphene.List(EventType)


    def resolve_get_all_events(root, info):
        return Event.objects.all()


