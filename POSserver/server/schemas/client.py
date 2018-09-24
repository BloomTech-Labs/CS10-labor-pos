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

    # def resolve_all_clients(self, info, **kwargs):
    #     user = info.context.user
    #     if user.is_anonymous:
    #         return Client.objects.none()
    #     else:
    #         return Client.objects.filter(user=user)

    # def resolve_client(self, info, **kwargs):
    #     user = info.context.user
    #     if user.is_anonymous:
    #         return Client.objects.none()
    #     else:
    #         return Client.objects.filter(user=user)


class CreateClient(graphene.Mutation):
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


class ClientMutation(graphene.ObjectType):
    create_client = CreateClient.Field()
