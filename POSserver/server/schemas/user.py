import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField


class User_Type(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude_fields = ("password",)
        filter_fields = [
            "id",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "state",
            "zipcode",
            "business_name",
            "date_joined",
            "modified_at",
            "premium",
            "paid_until",
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    user = graphene.Node.Field(User_Type)
    all_users = DjangoFilterConnectionField(User_Type)

    # def resolve_all_users(self, info, **kwargs):
    #     user = info.context.user  # needed to test if user is anonymous or not
    #     if user.is_anonymous:
    #         return get_user_model().objects.none()
    #     else:
    #         user = user.id  # int() has no attribute is_anonymous,
    #         # but without .id, it resolves to a SimpleLazyObject,
    #         # which is not the data type necessary for filtering
    #         return get_user_model().objects.filter(id=user)

    # def resolve_user(self, info, **kwargs):
    #     user = info.context.user  # needed to test if user is anonymous or not
    #     if user.is_anonymous:
    #         return get_user_model().objects.none()
    #     else:
    #         user = user.id  # int() has no attribute is_anonymous,
    #         # but without .id, it resolves to a SimpleLazyObject,
    #         # which is not the data type necessary for filtering
    #         return get_user_model().objects.filter(id=user)


class CreateUser(graphene.Mutation):
    class Arguments:
        """Input attributes needed to resolve CreateContractor"""

        username = graphene.String()
        password = graphene.String()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        street_address = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        business_name = graphene.String()

    ok = graphene.Boolean()
    user = graphene.Field(User_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        username,
        password,
        email,
        first_name,
        last_name,
        street_address,
        city,
        state,
        zipcode,
        business_name="",
    ):
        new_user = get_user_model()(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            street_address=street_address,
            city=city,
            state=state,
            zipcode=zipcode,
            business_name=business_name,
        )
        # IMPORTANT to remember to set password instead of just password=password
        new_user.set_password(password)
        new_user.save()
        return CreateUser(user=new_user, ok=True, status="ok")


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
