# from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Contractor


class Contractor_Type(DjangoObjectType):
    class Meta:
        model = Contractor
