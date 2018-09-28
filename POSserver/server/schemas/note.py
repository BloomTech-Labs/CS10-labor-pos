from graphene_django import DjangoObjectType
from server.models import Note, Client, Job
import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


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
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    note = graphene.Node.Field(Note_Type)
    all_notes = DjangoFilterConnectionField(Note_Type)

    # def resolve_all_notes(self, info, **kwargs):
    #     user = info.context.user
    #     if user.is_anonymous:
    #         return Note.objects.none()
    #     else:
    #         return Note.objects.filter(user=user)

    # def resolve_note(self, info, **kwargs):
    #     user = info.context.user
    #     if user.is_anonymous:
    #         return Note.objects.none()
    #     else:
    #         return Note.objects.filter(user=user)


class CreateNote(graphene.Mutation):
    """Create a note for a client or job -
    Notes contain a title and content field"""

    note = graphene.Field(Note_Type)

    class Arguments:
        job = graphene.ID()
        client = graphene.ID()
        title = graphene.String()
        content = graphene.String()

    ok = graphene.Boolean()
    note = graphene.Field(Note_Type)
    status = graphene.String()

    def mutate(self, info, title, content, client="", job=""):
        """Pass in all arguments for note creation,
        assigning an empty string for optional arguments"""
        user = info.context.user

        if user.is_anonymous:
            return CreateNote(ok=False, status="Must be logged in.")
        else:
            new_note = Note(title=title, content=content, user=user)
            if job != "":
                # if job is not empty string, use from_global_id method
                # pass from_global_id the value provided in argument
                # from_global_id() returns the [type, ID]
                # search Job model for instance where primary key is equal to ID returned
                # from the from_global_id() method
                # assign that instance to new_note.job before saving
                new_note.job = Job.objects.get(pk=from_global_id(job)[1])
            if client != "":
                new_note.client = Client.objects.get(pk=from_global_id(client)[1])
            new_note.save()
            return CreateNote(note=new_note, ok=True, status="ok")


class UpdateNote(graphene.Mutation):
    """Update note on client or job"""

    class Arguments:
        id = graphene.ID()
        title = graphene.String()
        content = graphene.String()
        job = graphene.ID()
        client = graphene.ID()

    ok = graphene.Boolean()
    note = graphene.Field(Note_Type)
    status = graphene.String()

    def mutate(self, info, id, title="", content="", job="", client=""):
        user = info.context.user

        if user.is_anonymous:
            return UpdateNote(ok=False, status="Must be logged in")
        else:
            updated_note = Note.objects.get(pk=from_global_id(id)[1])
            if job != "":
                updated_note.job = Job.objects.get(pk=from_global_id(job)[1])
            if client != "":
                updated_note.client = Client.objects.get(pk=from_global_id(client)[1])
            if title != "":
                updated_note.title = title
            if content != "":
                updated_note.content = content
            updated_note.save()
            return UpdateNote(note=updated_note, ok=True, status="ok")


class DeleteNote(graphene.Mutation):
    """Delete note on client or job"""

    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    note = graphene.Field(Note_Type)
    status = graphene.String()

    def mutate(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            return DeleteNote(ok=False, status="Must be logged in.")
        else:
            deleted_note = Note.objects.get(pk=from_global_id(id)[1])
            title = deleted_note.title
            deleted_note.delete()
            return DeleteNote(ok=True, status=f"{title} deleted")


class NoteMutation(graphene.ObjectType):
    create_note = CreateNote.Field()
    update_note = UpdateNote.Field()
    delete_note = DeleteNote.Field()
