from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Note


class Note_Type(DjangoObjectType):
    class Meta:
        model = Note
        filter_fields = ["title", "content", "created_at", "modified_at"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_notes = List(Note_Type)

    def resolve_all_notes(self, info, **kwargs):
        return Note.objects.all()
