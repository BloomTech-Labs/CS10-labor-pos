import graphene
from graphene_django import DjangoObjectType
from server.models import Tag
from graphene_django.filter import DjangoFilterConnectionField


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
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    # tags = graphene.List(Tag_Type)
    tags = DjangoFilterConnectionField(Tag_Type)

    def resolve_tags(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(user=user)


class CreateTag(graphene.Mutation):
    class Arguments:
        jobId = graphene.ID()
        noteId = graphene.ID()
        partId = graphene.ID()
        name = graphene.String()
        description = graphene.String()

    ok = graphene.Boolean()
    tag = graphene.Field(Tag_Type)
    status = graphene.String()

    def mutate(self, info, jobId, noteId, partId, name, description):
        user = info.context.user
        if user.is_anonymous:
            return CreateTag(ok=False, status="Must be logged in.")
        else:
            new_tag = Tag(
                jobId=jobId,
                noteId=noteId,
                partId=partId,
                name=name,
                description=description,
                userId=user,
            )
            new_tag.save()
            return CreateTag(tag=new_tag, ok=True, status="ok")


class TagMutation(graphene.ObjectType):
    create_tag = CreateTag.Field()
