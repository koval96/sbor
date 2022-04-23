import graphene
import graphql_jwt

from main.gql.auth.queries import AuthQueries
from main.gql.operations.mutations import OperationsMutations

from main.gql.operations.queries import OperationQueries
from main.gql.auth.mutations import AuthMutations

from main.gql.events.queries import EventQueries
from main.gql.events.mutations import EventMutations


class Query(AuthQueries, OperationQueries, EventQueries):
    pass


class Mutation(AuthMutations, OperationsMutations, EventMutations):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
