from graphene import relay, List, ObjectType
import graphene
from graphene_django import DjangoObjectType
from server.models import Part


class Part_Type(DjangoObjectType):
    class Meta:
        model = Part
        filter_fields = ["part_name", "description", "cost"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_parts = List(Part_Type)

    def resolve_all_parts(self, info, **kwargs):
        return Part.objects.all()


class CreatePart(graphene.Mutation):
    class Arguments:
        part_name = graphene.String()
        description = graphene.String()
        cost = graphene.Float(2)

    ok = graphene.Boolean()
    part_field = graphene.Field(Part_Type)

    def mutate(self, info, part_name, description, cost):

        new_part = Part(part_name=part_name, description=description, cost=cost)
        new_part.save()
        return CreatePart(part_field=new_part, ok=True)


class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()
