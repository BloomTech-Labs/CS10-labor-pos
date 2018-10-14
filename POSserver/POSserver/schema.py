import graphene
import graphql_jwt
import server.schemas
from server.schemas.user import User_Type


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(User_Type)

    @classmethod
    def resolve(cls, root, info):
        return cls(user=info.context.user)


class SuperQuery(
    server.schemas.tag.Query,
    server.schemas.note.Query,
    server.schemas.user.Query,
    server.schemas.part.Query,
    server.schemas.client.Query,
    server.schemas.job.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    server.schemas.tag.TagMutation,
    server.schemas.user.UserMutation,
    server.schemas.part.PartMutation,
    server.schemas.client.ClientMutation,
    server.schemas.note.NoteMutation,
    server.schemas.job.JobMutation,
    graphene.ObjectType,
):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=SuperQuery, mutation=Mutation)
