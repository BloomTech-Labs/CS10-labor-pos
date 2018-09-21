import graphene
from graphene_django import DjangoObjectType
from server.models import Client
from graphene_django.filter import DjangoFilterConnectionField


class Client_Type(DjangoObjectType):
    class Meta:
        model = Client
        filter_fields = [
            "id",
            "user",
            "contractor",
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
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    # clients = graphene.List(Client_Type)
    clients = DjangoFilterConnectionField(Client_Type)

    def resolve_clients(self, info):
        user = info.context.user
        if user.is_anonymous:
            return Client.objects.none()
        else:
            return Client.objects.filter(user=user)


class CreateClient(graphene.Mutation):
    class Arguments:
        contractor = graphene.ID()
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

    def mutate(
        self,
        info,
        contractor,
        business_name,
        first_name,
        last_name,
        email,
        street_number,
        unit_number,
        street_name,
        city,
        state,
        zipcode,
        deadline,
    ):
        user = info.context.user
        if user.is_anonymous:
            return CreateClient(ok=False, status="Must be logged in.")
        else:
            new_client = Client(
                contractor=contractor,
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
                userId=user,
            )
            new_client.save()
            return CreateClient(client=new_client, ok=True)


class ClientMutation(graphene.ObjectType):
    create_client = CreateClient.Field()
