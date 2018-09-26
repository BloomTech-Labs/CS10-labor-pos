import graphene
from graphene_django import DjangoObjectType
from server.models import Part, Job
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


class Part_Type(DjangoObjectType):
    class Meta:
        model = Part
        filter_fields = ["id", "user", "job", "name", "description", "cost"]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    part = graphene.Node.Field(Part_Type)
    all_parts = DjangoFilterConnectionField(Part_Type)

    def resolve_all_parts(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Part.objects.none()
        else:
            return Part.objects.filter(user=user)

    def resolve_part(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Part.objects.none()
        else:
            return Part.objects.filter(user=user)


class CreatePart(graphene.Mutation):
    class Arguments:
        job = graphene.ID()
        name = graphene.String()
        description = graphene.String()
        cost = graphene.Float(2)

    ok = graphene.Boolean()
    part = graphene.Field(Part_Type)
    status = graphene.String()

    def mutate(self, info, job, name, cost, description=""):
        user = info.context.user
        if user.is_anonymous:
            return CreatePart(ok=False, status="Must be logged in.")
        else:
            new_part = Part(
                job=Job.objects.get(pk=from_global_id(job)[1]),
                name=name,
                description=description,
                cost=cost,
                user=user,
            )
            new_part.save()
        return CreatePart(part=new_part, ok=True, status="ok")


class UpdatePart(graphene.Mutation):
    """Update note on client or job"""

    class Arguments:
        id = graphene.ID()
        name = graphene.String()
        description = graphene.String()
        cost = graphene.Float(2)

    ok = graphene.Boolean()
    part = graphene.Field(Part_Type)
    status = graphene.String()

    def mutate(self, info, id, title="", content=""):
        user = info.context.user

        if user.is_anonymous:
            return UpdatePart(ok=False, status="Must be logged in")
        else:
            updated_part = Part.objects.get(pk=from_global_id(id)[1])
            if title != "":
                updated_part.title = title
            if content != "":
                updated_part.content = content
            updated_part.save()
            return UpdatePart(part=updated_part, ok=True, status="ok")


class DeletePart(graphene.Mutation):
    """Delete note on client or job"""

    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    part = graphene.Field(Part_Type)
    status = graphene.String()

    def mutate(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            return DeletePart(ok=False, status="Must be logged in.")
        else:
            deleted_part = Part.objects.get(pk=from_global_id(id)[1])
            title = deleted_part.title
            deleted_part.delete()
            return DeletePart(ok=True, status=f"{title} deleted")


class PartMutation(graphene.ObjectType):
    create_part = CreatePart.Field()
