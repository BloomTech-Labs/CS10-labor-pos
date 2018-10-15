import graphene
from graphene_django import DjangoObjectType
from server.models import Charge, Token
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


class Token_Type(DjangoObjectType):
    class Meta:
        model = Token
        filter_fields = [
          "id",
          "user",
          "created",
          "livemode",
          "type", 
          "used", 
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    token = graphene.Node.Field(Token_Type)
    all_tokens = DjangoFilterConnectionField(Token_Type)

    def resolve_all_tokens(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Token.objects.none()
        else:
            return Token.objects.filter(user=user)


class CreateStripeToken(graphene.Mutation):
    class Arguments:
        created = graphene.String()
        livemode = graphene.Boolean()
        type = graphene.String()
        card = graphene.String()

    ok = graphene.Boolean()
    token = graphene.Field(Token_Type)
    status = graphene.String()

    def mutate(
      self,
      info,
      created,
      livemode,
      type,
      card,
      status,
    ):

        user = info.context.user
        if user.is_anonymous:
            return CreateStripeToken(ok=False, status="Must be logged in")
        else:
            new_token = Token(
              created=created,
              livemode=livemode,
              type=type,
              card=card,
              status=status,
          )

          new_token.save()
          return CreateStripeToken(token=new_token, ok=True, status="ok")


class TokenMutation(graphene.ObjectType):
    create_stripe_token = CreateStripeToken.Field()
