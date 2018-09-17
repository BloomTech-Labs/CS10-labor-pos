from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Note


class Note_Type(DjangoObjectType):
    class Meta:
        model = Note
        filter_fields = ["title", "content", "created_at", "modified_at"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_notes = List(Note_Type)

    def resolve_all_notes(self, info, **kwargs):
        return Note.objects.all()

class CreateNote(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        content = graphene.String()

    ok = graphene.Boolean()
    note_field = graphene.Field(Note_Type)

    def mutate(self, info, title, content):

        user = info.context.user
        if user.is_anonymous:
            return CreateNote(ok=False, status="Must be logged in.")
        else:
            new_note = Note(title=title, content=content, ok=True)
            new_note.save()
            return CreateNote(note_field=new_note, ok=True)

class NoteMutation(graphene.ObjectType):
    create_note = CreateNote.Field()   
