from graphene import relay, List, ObjectType
import graphene
from graphene_django import DjangoObjectType
from server.models import Part


class Part_Type(DjangoObjectType):
    class Meta:
        model = Part
        filter_fields = ["part_name", "description", "cost", "job"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    parts = List(Part_Type)

    def resolve_parts(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Part.objects.none()
        else:
            return Part.objects.filter(user=user)


class CreatePart(graphene.Mutation):
    class Arguments:
        jobId = graphene.String()
        part_name = graphene.String()
        description = graphene.String()
        cost = graphene.Float(2)

    ok = graphene.Boolean()
    part = graphene.Field(Part_Type)

    def mutate(self, info, part_name, description, cost, jobId):

        user = info.context.user
        if user.is_anonymous:
            return CreatePart(ok=False, status="Must be logged in.")
        else:
            new_part = Part(

                part_name=part_name, description=description, cost=cost,
                job_id=jobId
            )
            new_part.save()
        return CreatePart(part=new_part, ok=True)


class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()
