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
    """Create a job for client -
    Jobs contain:
    a complete Boolean,
    a labor Float,
    an optional deadline,
    a name,
    and a description"""

    class Arguments:
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
        self, info, client, name, description, complete=False, deadline="", labor=""
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
                complete=complete,
                user=user,
            )
            if labor != "":
                new_job.labor = labor
            if deadline != "":
                new_job.deadline = deadline
            if complete is not False:
                new_job.complete = complete
            new_job.save()
            return CreateJob(job=new_job, ok=True, status="ok")


class UpdateJob(graphene.Mutation):
    """Update a job for a client"""

    class Arguments:
        id = graphene.ID()
        complete = graphene.Boolean()
        name = graphene.String()
        labor = graphene.Float(2)
        description = graphene.String()
        deadline = graphene.types.datetime.Date()
        client = graphene.ID()

    ok = graphene.Boolean()
    job = graphene.Field(Job_Type)
    status = graphene.String()

    def mutate(
        self,
        info,
        id,
        name="",
        description="",
        complete="",
        deadline=None,
        labor="",
        client="",
    ):
        # Will need to pass null or nothing in for empty deadline on frontend
        user = info.context.user
        if user.is_anonymous:
            return UpdateJob(ok=False, status="Must be logged in.")
        else:
            updated_job = Job.objects.get(pk=from_global_id(id)[1])
            if client != "":
                updated_job.client = Client.objects.get(pk=from_global_id(client)[1])
            if name != "":
                updated_job.name = name
            if description != "":
                updated_job.description = description
            if complete != "":
                updated_job.complete = complete
            if deadline is not None:
                updated_job.deadline = deadline
            if labor != "":
                updated_job.labor = labor
            updated_job.save()
            return UpdateJob(
                job=updated_job, ok=True, status=f"Updated {updated_job.name}"
            )


class DeleteJob(graphene.Mutation):
    """Delete job for a client"""

    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    note = graphene.Field(Job_Type)
    status = graphene.String()

    def mutate(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            return DeleteJob(ok=False, status="Must be logged in.")
        else:
            deleted_job = Job.objects.get(pk=from_global_id(id)[1])
            name = deleted_job.name
            deleted_job.delete()
            return DeleteJob(ok=True, status=f"{name} deleted")


class JobMutation(graphene.ObjectType):
    create_job = CreateJob.Field()
    update_job = UpdateJob.Field()
    delete_job = DeleteJob.Field()
