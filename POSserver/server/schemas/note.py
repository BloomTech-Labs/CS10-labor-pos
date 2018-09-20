from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Note
import graphene


class Note_Type(DjangoObjectType):
    class Meta:
        model = Note
        filter_fields = [
            "client",
            "job",
            "title",
            "content",
            "created_at",
            "modified_at",
        ]
        interfaces = (relay.Node,)


class Query(ObjectType):
    notes = List(Note_Type)

    def resolve_notes(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Note.objects.none()
        else:
            return Note.objects.filter(user=user)


class CreateNote(graphene.Mutation):
    class Arguments:
        clientId = graphene.String()
        jobId = graphene.String()
        title = graphene.String()
        content = graphene.String()
        created_at = graphene.types.datetime.DateTime()
        modified_at = graphene.types.datetime.DateTime()

    ok = graphene.Boolean()
    note = graphene.Field(Note_Type)

    def mutate(self, info, title, content, clientId, createdAt, modifiedAt, jobId):

        user = info.context.user
        if user.is_anonymous:
            return CreateNote(ok=False, status="Must be logged in.")
        else:
            new_note = Note(
                title=title,
                content=content,
                client_id=clientId,
                job_id=jobId,
                created_at=createdAt,
                modified_at=modifiedAt,
            )
            new_note.save()
            return CreateNote(note=new_note, ok=True)


class NoteMutation(graphene.ObjectType):
    create_note = CreateNote.Field()
