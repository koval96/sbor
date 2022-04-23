import graphene
import graphql_jwt

from main.gql.auth.queries import AuthQueries
from main.gql.operations.mutations import OperationsMutations

from main.gql.operations.queries import OperationQueries
from main.gql.auth.mutations import AuthMutations


class Query(AuthQueries, OperationQueries):
    pass


class Mutation(AuthMutations, OperationsMutations):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
