import graphene

from main.gql.types import UserType, OperationType
from main.models import ExtendedUser, Operation

class OperationQueries(graphene.ObjectType):
    get_all_operations = graphene.List(OperationType)


    def resolve_get_all_operations(root, info):
        return Operation.objects.all()


