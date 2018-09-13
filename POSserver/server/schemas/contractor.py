from graphene import relay, List, ObjectType
from graphene_django import DjangoObjectType
from server.models import Contractor


class Contractor_Type(DjangoObjectType):
    class Meta:
        model = Contractor
        filter_fields = [
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
    all_contractors = List(Contractor_Type)

    def resolve_all_contractors(self, info, **kwargs):
        return Contractor.objects.all()
