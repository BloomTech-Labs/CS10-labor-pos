# from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Job


class Job_Type(DjangoObjectType):
    class Meta:
        model = Job
