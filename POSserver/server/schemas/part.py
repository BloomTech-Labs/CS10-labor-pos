import graphene
from graphene_django import DjangoObjectType
from server.models import Part
from graphene_django.filter import DjangoFilterConnectionField


class Part_Type(DjangoObjectType):
    class Meta:
        model = Part
        filter_fields = ["id", "user", "job", "name", "description", "cost"]
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    # parts = graphene.List(Part_Type)
    parts = DjangoFilterConnectionField(Part_Type)

    def resolve_parts(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Part.objects.none()
        else:
            return Part.objects.filter(user=user)


class CreatePart(graphene.Mutation):
    class Arguments:
        jobId = graphene.ID()
        name = graphene.String()
        description = graphene.String()
        cost = graphene.Float(2)

    ok = graphene.Boolean()
    part = graphene.Field(Part_Type)
    status = graphene.String()

    def mutate(self, info, jobId, name, description, cost):
        user = info.context.user
        if user.is_anonymous:
            return CreatePart(ok=False, status="Must be logged in.")
        else:
            new_part = Part(
                jobId=jobId, name=name, description=description, cost=cost, userId=user
            )
            new_part.save()
        return CreatePart(part=new_part, ok=True, status="ok")


class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()
