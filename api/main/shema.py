import graphene
import graphql_jwt


class Query():
    pass


class Mutation():
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
