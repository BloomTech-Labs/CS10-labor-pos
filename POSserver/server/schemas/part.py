# from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Part


class Part_Type(DjangoObjectType):
    class Meta:
        model = Part
