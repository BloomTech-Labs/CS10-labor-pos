import graphene
from graphene_django import DjangoObjectType
from server.models import Client
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id

auto_debug = True


class Client_Type(DjangoObjectType):
    class Meta:
        model = Client
        filter_fields = [
            "id",
            "user",
            "business_name",
            "first_name",
            "last_name",
            "email",
            "street_number",
            "unit_number",
            "street_name",
            "city",
            "state",
            "zipcode",
            "created_at",
            "modified_at",
            "deadline",
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    client = graphene.Node.Field(Client_Type)
    all_clients = DjangoFilterConnectionField(Client_Type)

    if auto_debug is False:

        def resolve_all_clients(self, info, **kwargs):
            user = info.context.user
            if user.is_anonymous:
                return Client.objects.none()
            else:
                return Client.objects.filter(user=user)

        def resolve_client(self, info, **kwargs):
            user = info.context.user
            if user.is_anonymous:
                return Client.objects.none()
            else:
                return Client.objects.filter(user=user)


class CreateClient(graphene.Mutation):
    """Create a client -
    Clients contain:
        an optional business name,
        a first name,
        a last name,
        an email,
        a street number,
        an optional unit number,
        a street name,
        a city,
        a state,
        a zipcode,
        and an optional deadline field"""

    class Arguments:
        business_name = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        street_number = graphene.String()
        unit_number = graphene.String()
        street_name = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        deadline = graphene.types.datetime.Date()

    ok = graphene.Boolean()
    client = graphene.Field(Client_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        first_name,
        last_name,
        email,
        street_number,
        street_name,
        city,
        state,
        zipcode,
        deadline=None,
        business_name="",
        unit_number="",
    ):
        user = info.context.user
        if user.is_anonymous:
            return CreateClient(ok=False, status="Must be logged in.")
        else:
            new_client = Client(
                business_name=business_name,
                first_name=first_name,
                last_name=last_name,
                email=email,
                street_number=street_number,
                unit_number=unit_number,
                street_name=street_name,
                city=city,
                state=state,
                zipcode=zipcode,
                user=user,
            )
            new_client.save()
            return CreateClient(client=new_client, ok=True, status="ok")


class UpdateClient(graphene.Mutation):
    """Update a client"""

    class Arguments:
        id = graphene.ID()
        business_name = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        street_number = graphene.String()
        unit_number = graphene.String()
        street_name = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        deadline = graphene.types.datetime.Date()

    ok = graphene.Boolean()
    client = graphene.Field(Client_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        id,
        first_name="",
        last_name="",
        email="",
        street_number="",
        street_name="",
        city="",
        state="",
        zipcode="",
        deadline=None,
        business_name="",
        unit_number="",
    ):
        # Will need to pass null or nothing in for empty deadline on frontend
        user = info.context.user
        if user.is_anonymous:
            return UpdateClient(ok=False, status="Must be logged in.")
        else:
            updated_client = Client.objects.get(pk=from_global_id(id)[1])
            if first_name != "":
                updated_client.first_name = first_name
            if last_name != "":
                updated_client.last_name = last_name
            if email != "":
                updated_client.email = email
            if street_number != "":
                updated_client.street_number = street_number
            if city != "":
                updated_client.city = city
            if state != "":
                updated_client.state = state
            if zipcode != "":
                updated_client.zipcode = zipcode
            if deadline is not None:
                updated_client.deadline = deadline
            if business_name != "":
                updated_client.business_name = business_name
            if unit_number != "":
                updated_client.unit_number = unit_number
            updated_client.save()
            return UpdateClient(
                client=updated_client,
                ok=True,
                status=f"{updated_client.first_name} {updated_client.last_name} has been updated",
            )


class DeleteClient(graphene.Mutation):
    """Delete a client"""

    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    note = graphene.Field(Client_Type)
    status = graphene.String()

    def mutate(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            return DeleteClient(ok=False, status="Must be logged in.")
        else:
            deleted_client = Client.objects.get(pk=from_global_id(id)[1])
            name = f"{deleted_client.last_name} {deleted_client.last_name}"
            deleted_client.delete()
            return DeleteClient(ok=True, status=f"{name} deleted")


class ClientMutation(graphene.ObjectType):
    create_client = CreateClient.Field()
    update_client = UpdateClient.Field()
    delete_client = DeleteClient.Field()
