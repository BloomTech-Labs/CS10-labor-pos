import graphene

import server.schemas


class SuperQuery(
    server.schemas.tag.Query,
    server.schemas.note.Query,
    server.schemas.contractor.Query,
    graphene.ObjectType,
):
    pass


class Mutation(server.schemas.tag.TagMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=SuperQuery, mutation=Mutation)
