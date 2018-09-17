from graphene import relay, List, ObjectType
import graphene
from graphene_django import DjangoObjectType
from server.models import Account


class Account_Type(DjangoObjectType):
    class Meta:
        model = Account
        filter_fields = [
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
        ]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_accounts = List(Account_Type)

    def resolve_all_accounts(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Account.objects.none()
        else: 
            return Account.objects.filter(user=user)


class CreateAccount(graphene.Mutation):
    class Arguments:
        userId = graphene.ID()
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

    ok = graphene.Boolean()
    account_field = graphene.Field(Account_Type)

    def mutate(
        self,
        info,
        business_name,
        first_name,
        last_name,
        email,
        street_number,
        street_name,
        city,
        state,
        zipcode,
        userId,
        unit_number="",
    ):
        user = info.context.user
        if user.is_anonymous:
            return CreateAccount(ok=False, status "Must be logged in.")
        else:
            new_account = Account(
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
                user_id=userId,
                )
            new_account.save()
            return CreateAccount(account_field=new_account, ok=True)


class AccountMutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
