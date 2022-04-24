from lib2to3.pgen2.token import OP
import graphene

from main.gql.types import UserType, OperationType, NewsType
from main.models import ExtendedUser, Operation, News

class OperationQueries(graphene.ObjectType):
    get_all_operations = graphene.List(OperationType)
    get_operation_by_id = graphene.Field(OperationType, id=graphene.ID(required=True))
    get_all_news = graphene.List(NewsType)


    def resolve_get_all_operations(root, info):
        return Operation.objects.all()

    def resolve_get_operation_by_id(root, info, id):
        return Operation.objects.get(id=id)

    def resolve_get_all_news(root, info):
        return News.objects.all()


