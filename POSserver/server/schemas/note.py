# from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Note


class Note_Type(DjangoObjectType):
    class Meta:
        model = Note
