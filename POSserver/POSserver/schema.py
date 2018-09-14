import graphene
import graphql_jwt
import server.schemas


class SuperQuery(
    server.schemas.tag.Query,
    server.schemas.note.Query,
    server.schemas.contractor.Query,
    server.schemas.user.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    server.schemas.tag.TagMutation,
    server.schemas.user.UserMutation,
    server.schemas.contractor.ContractorMutation,
    graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=SuperQuery, mutation=Mutation)
