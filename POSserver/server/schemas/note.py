from graphene_django import DjangoObjectType
from server.models import Note
import graphene
from graphene_django.filter import DjangoFilterConnectionField


class Note_Type(DjangoObjectType):
    class Meta:
        model = Note
        filter_fields = [
            "id",
            "user",
            "client",
            "job",
            "title",
            "content",
            "created_at",
            "modified_at",
        ]
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    # notes = graphene.List(Note_Type)
    notes = DjangoFilterConnectionField(Note_Type)

    def resolve_notes(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Note.objects.none()
        else:
            return Note.objects.filter(user=user)


class CreateNote(graphene.Mutation):
    class Arguments:
        clientId = graphene.ID()
        jobId = graphene.ID()
        title = graphene.String()
        content = graphene.String()
        created_at = graphene.types.datetime.DateTime()
        modified_at = graphene.types.datetime.DateTime()

    ok = graphene.Boolean()
    note = graphene.Field(Note_Type)
    status = graphene.String()

    def mutate(self, info, title, content, clientId, createdAt, modifiedAt, jobId):

        user = info.context.user
        if user.is_anonymous:
            return CreateNote(ok=False, status="Must be logged in.")
        else:
            new_note = Note(
                title=title,
                content=content,
                clientId=clientId,
                jobId=jobId,
                created_at=createdAt,
                modified_at=modifiedAt,
                userId=user,
            )
            new_note.save()
            return CreateNote(note=new_note, ok=True, status="ok")


class NoteMutation(graphene.ObjectType):
    create_note = CreateNote.Field()
