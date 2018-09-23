import graphene
from graphene_django import DjangoObjectType
from server.models import Tag, Part, Job, Note
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


class Tag_Type(DjangoObjectType):
    class Meta:
        model = Tag
        filter_fields = [
            "id",
            "job",
            "note",
            "part",
            "name",
            "description",
            "created_at",
            "modified_at",
            "user",
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    tag = graphene.Node.Field(Tag_Type)
    tags = DjangoFilterConnectionField(Tag_Type)

    def resolve_tags(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(user=user)

    def resolve_tag(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(user=user)


class CreateTag(graphene.Mutation):
    class Arguments:
        job = graphene.ID()
        note = graphene.ID()
        part = graphene.ID()
        name = graphene.String()
        description = graphene.String()

    ok = graphene.Boolean()
    tag = graphene.Field(Tag_Type)
    status = graphene.String()

    def mutate(self, info, name, description="", job="", note="", part=""):
        user = info.context.user
        if user.is_anonymous:
            return CreateTag(ok=False, status="Must be logged in.")
        else:
            new_tag = Tag(name=name, description=description, user=user)
            if job != "":
                # if job is not empty string, use from_global_id method
                # pass from_global_id the value provided in argument
                # from_global_id() returns the [type, ID]
                # search Job model for instance where primary key is equal to ID returned
                # from the from_global_id() method
                # assign that instance to new_note.job before saving
                new_tag.job = Job.objects.get(pk=from_global_id(job)[1])
            if note != "":
                new_tag.note = Note.objects.get(pk=from_global_id(note)[1])
            if part != "":
                new_tag.part = Part.objects.get(pk=from_global_id(part)[1])
            new_tag.save()
            return CreateTag(tag=new_tag, ok=True, status="ok")


class TagMutation(graphene.ObjectType):
    create_tag = CreateTag.Field()
