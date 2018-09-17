import graphene
import graphql_jwt
import server.schemas


class SuperQuery(
    server.schemas.tag.Query,
    server.schemas.note.Query,
    server.schemas.contractor.Query,
    server.schemas.user.Query,
    server.schemas.part.Query,
    server.schemas.account.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    server.schemas.tag.TagMutation,
    server.schemas.user.UserMutation,
    server.schemas.contractor.ContractorMutation,
    server.schemas.part.PartMutation,
    server.schemas.account.AccountMutation,
    server.schemas.note.NoteMutation,
    graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=SuperQuery, mutation=Mutation)
