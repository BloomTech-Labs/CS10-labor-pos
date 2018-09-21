from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField


class User_Type(DjangoObjectType):
    # id = graphene.ID(source="pk")

    class Meta:
        model = get_user_model()
        filter_fields = ["id", "username"]
        interfaces = (graphene.relay.Node,)


class CreateUser(graphene.Mutation):
    user = graphene.Field(User_Type)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(username=username, email=email)
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()


class Query(graphene.ObjectType):
    # me = graphene.Field(User_Type)
    users = graphene.List(User_Type)
    all_users = DjangoFilterConnectionField(User_Type)

    def resolve_users(self, info):
        return get_user_model().objects.all()

    # def resolve_me(self, info):
    #     user = info.context.user
    #     if user.is_anonymous:
    #         raise Exception("Not logged in!")
