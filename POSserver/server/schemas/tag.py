import graphene
import graphene_django
from server.models import Tag


class Tag_Type(graphene_django.DjangoObjectType):
    class Meta:
        model = Tag
        filter_fields = ["user", "name", "description"]
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    tags = graphene.List(Tag_Type)

    def resolve_tags(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(user=user)


class CreateTag(graphene.Mutation):
    class Arguments:
        userID = graphene.String()
        name = graphene.String(required=True)
        description = graphene.String(required=True)

    ok = graphene.Boolean()
    tag_field = graphene.Field(Tag_Type)

    def mutate(self, info, name, description, userId):

        user = info.context.user
        if user.is_anonymous:
            return CreateTag(ok=False, status="Must be logged in.")
        else:
            new_tag = Tag(name=name, description=description, user_id=userId)
            new_tag.save()
            return CreateTag(tag_field=new_tag, ok=True)


class TagMutation(graphene.ObjectType):
    create_tag = CreateTag.Field()
