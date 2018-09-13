from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Tag


class Tag_Type(DjangoObjectType):
    class Meta:
        model = Tag
        filter_fields = ["name", "description"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_tags = List(Tag_Type)

    def resolve_all_tags(self, info, **kwargs):
        return Tag.objects.all()
