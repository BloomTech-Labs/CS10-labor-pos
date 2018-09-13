import graphene

import server.schemas


class Query(server.schemas.tag.Query, server.schemas.note.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
