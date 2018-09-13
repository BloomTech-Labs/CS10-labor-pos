import graphene

import server.schemas


class Query(server.schemas.tag.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
