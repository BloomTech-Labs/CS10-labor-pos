import graphene
from graphene_django import DjangoObjectType
from server.models import Contractor
from graphene_django.filter import DjangoFilterConnectionField


class Contractor_Type(DjangoObjectType):
    class Meta:
        model = Contractor
        filter_fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "state",
            "zipcode",
            "business_name",
            "created_at",
            "modified_at",
            "premium",
            "paid_until",
        ]
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    # contractors = graphene.List(Contractor_Type)
    contractors = DjangoFilterConnectionField(Contractor_Type)

    def resolve_contractors(self, info):
        user = info.context.user

        if user.is_anonymous:
            return Contractor.objects.none()
        else:
            return Contractor.objects.filter(user=user)


class CreateContractor(graphene.Mutation):
    class Arguments:
        userId = graphene.ID()
        first_name = graphene.String()
        last_name = graphene.String()
        street_address = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        business_name = graphene.String()

    ok = graphene.Boolean()
    contractor = graphene.Field(Contractor_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        userId,
        first_name,
        last_name,
        street_address,
        city,
        state,
        zipcode,
        business_name,
    ):
        user = info.context.user
        if user.is_anonymous:
            return CreateContractor(ok=False, status="Must be logged in.")
        else:
            new_contractor = Contractor(
                first_name=first_name,
                last_name=last_name,
                street_address=street_address,
                city=city,
                state=state,
                zipcode=zipcode,
                business_name=business_name,
                userId=userId,
            )
            new_contractor.save()
            return CreateContractor(contractor=new_contractor, ok=True, status="ok")


class ContractorMutation(graphene.ObjectType):
    create_contractor = CreateContractor.Field()
