import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id
from django.contrib.auth.models import BaseUserManager
from graphql_jwt.shortcuts import get_token
from django.utils import timezone
from dateutil.relativedelta import relativedelta

auto_debug = True


class User_Type(DjangoObjectType):
    objects = BaseUserManager

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

    if auto_debug is False:

        def resolve_all_users(self, info, **kwargs):
            user = info.context.user  # needed to test if user is anonymous or not
            if user.is_anonymous:
                return get_user_model().objects.none()
            else:
                user = user.id  # int() has no attribute is_anonymous,
                # but without .id, it resolves to a SimpleLazyObject,
                # which is not the data type necessary for filtering
                return get_user_model().objects.filter(id=user)

        def resolve_user(self, info, **kwargs):
            user = info.context.user  # needed to test if user is anonymous or not
            if user.is_anonymous:
                return get_user_model().objects.none()
            else:
                user = user.id  # int() has no attribute is_anonymous,
                # but without .id, it resolves to a SimpleLazyObject,
                # which is not the data type necessary for filtering
                return get_user_model().objects.filter(id=user)


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
    token = graphene.String()

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
        token = get_token(new_user)
        return CreateUser(user=new_user, token=token, ok=True, status="ok")


class UpdateUser(graphene.Mutation):
    class Arguments:
        """Update User model"""

        id = graphene.ID()
        username = graphene.String()
        old_password = graphene.String()
        new_password = graphene.String()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        street_address = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        business_name = graphene.String()
        subscription = graphene.String()

    ok = graphene.Boolean()
    user = graphene.Field(User_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        id,
        username="",
        new_password="",
        old_password="",
        email="",
        first_name="",
        last_name="",
        street_address="",
        city="",
        state="",
        zipcode="",
        business_name="",
        subscription="",
    ):
        trackeduser = info.context.user

        if trackeduser.is_anonymous:
            return UpdateUser(ok=False, status="Must be logged in")
        else:
            updated_user = get_user_model().objects.get(pk=from_global_id(id)[1])
            if username != "":
                updated_user.username = username
            if old_password != "" and new_password != "":
                if updated_user.check_password(old_password) is True:
                    updated_user.set_password(new_password)
                else:
                    raise Exception("Password does not match")
            if old_password != "" and new_password == "":
                raise Exception("Please supply new password")
            if new_password != "" and old_password == "":
                raise Exception("Please supply old password")
            if email != "":
                updated_user.email = email
            if first_name != "":
                updated_user.first_name = first_name
            if last_name != "":
                updated_user.last_name = last_name
            if street_address != "":
                updated_user.street_address = street_address
            if city != "":
                updated_user.city = city
            if state != "":
                updated_user.state = state
            if zipcode != "":
                updated_user.zipcode = zipcode
            if business_name != "":
                updated_user.business_name = business_name
            if subscription != "":
                if subscription == "month":
                    updated_user.premium = True
                    updated_user.paid_until = timezone.now() + relativedelta(months=1)
                if subscription == "year":
                    updated_user.premium = True
                    updated_user.paid_until = timezone.now() + relativedelta(months=12)

            updated_user.save()
            return UpdateUser(user=updated_user, ok=True, status="ok")


class DeleteUser(graphene.Mutation):
    """Delete note on client or job"""

    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    userinfo = graphene.Field(User_Type)
    status = graphene.String()

    def mutate(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            return DeleteUser(ok=False, status="Must be logged in.")
        else:
            deleted_user = get_user_model().objects.get(pk=from_global_id(id)[1])
            first_name = deleted_user.first_name
            last_name = deleted_user.last_name
            deleted_user.delete()
            return DeleteUser(ok=True, status=f"{first_name} {last_name} deleted")


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
