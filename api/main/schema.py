import graphene
import graphql_jwt

from main.gql.auth.queries import AuthQueries
from main.gql.auth.mutations import AuthMutations

from main.gql.operations.queries import OperationQueries


class Query(AuthQueries, OperationQueries):
    pass


class Mutation(AuthMutations):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
