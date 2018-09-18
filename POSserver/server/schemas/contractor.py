from graphene import relay, List, ObjectType
import graphene
from graphene_django import DjangoObjectType
from server.models import Contractor


class Contractor_Type(DjangoObjectType):
    class Meta:
        model = Contractor
        filter_fields = [
            "user",
            "first_name",
            "last_name",
            "city",
            "state",
            "email",
            "zip_code",
            "business_name",
            "premium",
            "paid_until",
        ]
        interfaces = (relay.Node,)


class Query(ObjectType):
    contractors = List(Contractor_Type)

    def resolve_contractors(self, info, **kwargs):
        return Contractor.objects.all()


class CreateContractor(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        street_address = graphene.String()
        city = graphene.String()
        state = graphene.String()
        zipcode = graphene.String()
        business_name = graphene.String()

    ok = graphene.Boolean()
    contractor = graphene.Field(Contractor_Type)

    def mutate(
        self,
        info,
        first_name,
        last_name,
        email,
        street_address,
        city,
        state,
        zipcode,
        business_name,
        user_id,
    ):
        new_contractor = Contractor(
            first_name=first_name,
            last_name=last_name,
            email=email,
            street_address=street_address,
            city=city,
            state=state,
            zipcode=zipcode,
            business_name=business_name,
            user_id=user_id,
        )
        new_contractor.save()
        return CreateContractor(contractor=new_contractor, ok=True)


class ContractorMutation(graphene.ObjectType):
    create_contractor = CreateContractor.Field()
