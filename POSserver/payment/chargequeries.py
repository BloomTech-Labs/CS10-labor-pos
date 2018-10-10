import graphene
from graphene_django import DjangoObjectType
from server.models import Charge
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


class Charge_Type(DjangoObjectType):
    class Meta:
        model = Charge
        filter_fields = [
          "id",
          "user",
          "amount",
          "captured",
          "created",
          "currency",
          "description",
          "status",
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    charge = graphene.Node.Field(Charge_Type)
    all_charges = DjangoFilterConnectionField(Charge_Type)

    def resolve_all_charges(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Charge.objects.none()
        else:
            return Charge.objects.filter(user=user)


class CreateStripeCharge(graphene.Mutation):
    class Arguments:
        amount = graphene.String()
        captured = graphene.Boolean()
        created = graphene.String()
        currency = graphene.String()
        description = graphene.String()
    
    ok = graphene.Boolean()
    charge = graphene.Field(Charge_Type)
    status = graphene.String()

    def mutate(
      self,
      info, 
      amount,
      captured,
      created,
      currency,
      description,
      status,
    ):

        user = info.context.user
        if user.is_anonymous:
            return CreateStripeCharge(ok=False, status="Must be logged in")
        else:
            new_charge = Charge(
              amount=amount,
              captured=captured,
              created=created,
              currency=currency,
              description=description,
              status=status,
        )

        new_charge.save()
        return CreateStripeCharge(charge=new_charge, ok=True, status="ok")


class ChargeMutation(graphene.ObjectType):
    create_stripe_charge = CreateStripeCharge.Field()