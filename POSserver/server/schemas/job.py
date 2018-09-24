import graphene
from graphene_django import DjangoObjectType
from server.models import Job, Client
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


class Job_Type(DjangoObjectType):
    class Meta:
        model = Job
        filter_fields = [
            "id",
            "user",
            "client",
            "name",
            "complete",
            "labor",
            "description",
            "created_at",
            "modified_at",
            "deadline",
        ]
        interfaces = (graphene.Node,)


class Query(graphene.ObjectType):
    job = graphene.Node.Field(Job_Type)
    all_jobs = DjangoFilterConnectionField(Job_Type)

    def resolve_all_jobs(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Job.objects.none()
        else:
            return Job.objects.filter(user=user)

    def resolve_job(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            return Job.objects.none()
        else:
            return Job.objects.filter(user=user)


class CreateJob(graphene.Mutation):
    class Input:
        client = graphene.ID()
        complete = graphene.Boolean()
        name = graphene.String()
        labor = graphene.Float(2)
        description = graphene.String()
        deadline = graphene.types.datetime.Date()

    ok = graphene.Boolean()
    job = graphene.Field(Job_Type)
    status = graphene.String()

    def mutate(
        self, info, client, name, description, complete, deadline=None, labor=""
    ):
        # Will need to pass null or nothing in for empty deadline on frontend
        user = info.context.user
        if user.is_anonymous:
            return CreateJob(ok=False, status="Must be logged in.")
        else:
            new_job = Job(
                client=Client.objects.get(pk=from_global_id(client)[1]),
                name=name,
                description=description,
                labor=labor,
                complete=complete,
                deadline=deadline,
                user=user,
            )
            new_job.save()
            return CreateJob(job=new_job, ok=True, status="ok")


class JobMutation(graphene.ObjectType):
    create_job = CreateJob.Field()
