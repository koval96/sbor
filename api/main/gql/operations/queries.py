from lib2to3.pgen2.token import OP
import graphene

from main.gql.types import FacilityType, OperationType, NewsType
from main.models import Facility, Operation, News

class OperationQueries(graphene.ObjectType):
    get_all_operations = graphene.List(OperationType)
    get_operation_by_id = graphene.Field(OperationType, id=graphene.ID(required=True))
    get_all_news = graphene.List(NewsType)
    get_all_facilities = graphene.List(FacilityType)


    def resolve_get_all_operations(root, info):
        return Operation.objects.all()

    def resolve_get_operation_by_id(root, info, id):
        return Operation.objects.get(id=id)

    def resolve_get_all_news(root, info):
        return News.objects.all()

    def resolve_get_all_facilities(root, info):
        return Facility.objects.all()


