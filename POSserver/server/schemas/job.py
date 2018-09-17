from graphene import relay, List, ObjectType
import graphene
from graphene_django import DjangoObjectType
from server.models import Job


class Job_Type(DjangoObjectType):
    class Meta:
        model = Job
        filter_fields = ["name", "labor", "description"]
        interfaces = (relay.Node,)


class Query(ObjectType):
    all_jobs = List(Job_Type)

    def resolve_all_jobs(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            return Job.objects.none()
        else:
            return Job.objects.filter(user=user)


class CreateJob(graphene.Mutation):
    class Arguments:
        userId = graphene.ID()
        name = graphene.String()
        labor = graphene.Float(2)
        description = graphene.String()

    ok = graphene.Boolean()
    job_field = graphene.Field(Job_Type)

    def mutate(self, info, userId, name, labor, description):
        user = info.context.user
        if user.is_anonymous:
            return CreateJob(ok=False, status="Must be logged in.")
        else:
            new_tag = Job(name=name, description=description)
            new_tag.save()
            return CreateJob(tag_field=new_tag, ok=True)


class JobMutation(graphene.ObjectType):
    create_job = CreateJob.Field()
