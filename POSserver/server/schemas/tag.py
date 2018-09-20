import graphene
import graphene_django
from server.models import Tag
from graphene_django.filter import DjangoFilterConnectionField


class Tag_Type(graphene_django.DjangoObjectType):
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
        ]
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    tags = graphene.List(Tag_Type)
    all_tags = DjangoFilterConnectionField(Tag_Type)

    def resolve_tags(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(user=user)


class CreateTag(graphene.Mutation):
    class Arguments:
        jobId = graphene.String()
        noteId = graphene.String()
        partId = graphene.String()
        name = graphene.String(required=True)
        description = graphene.String(required=True)

    ok = graphene.Boolean()
    tag = graphene.Field(Tag_Type)

    def mutate(self, info, name, description, jobId, noteId, partId):

        user = info.context.user
        if user.is_anonymous:
            return CreateTag(ok=False, status="Must be logged in.")
        else:
            new_tag = Tag(
                name=name,
                description=description,
                job_id=jobId,
                part_id=partId,
                note_id=noteId,
            )
            new_tag.save()
            return CreateTag(tag=new_tag, ok=True)


class TagMutation(graphene.ObjectType):
    create_tag = CreateTag.Field()
