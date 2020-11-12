# for pdf views
from django.http import HttpResponse
from django.views.generic import View
import datetime
from .utils import render_to_pdf
from server.models import Job, Part, Client, User
from graphql_relay.node.node import from_global_id
import json


class GeneratePDF(View):
    def post(self, request, *args, **kwargs):
        # sends job info to be populated into invoice form
        req = json.loads(request.body)
        job = Job.objects.get(pk=from_global_id(req["job"])[1])
        user = User.objects.get(pk=job.user_id)
        client = Client.objects.filter(pk=job.client_id).get()
        job_parts = Part.objects.filter(job_id=job).values()
        total = 0
        for part in job_parts:
            total = total + part["cost"]
        total = total + job.labor
        context = {
            "invoice_number": job.id,
            "today": datetime.date.today(),
            "customer": user,
            "parts": job_parts,
            "labor": job.labor,
            "client_name": " ".join([client.first_name, client.last_name]),
            "client": client,
            "order_id": job.id,
            "total": total,
        }
        pdf = render_to_pdf("invoice.html", context)
        if pdf:
            response = HttpResponse(pdf, content_type="application/pdf")
            filename = "Invoice_%s.pdf" % (job.id)
            content = "inline; filename='%s'" % (filename)
            response["Content-Disposition"] = content
            return response
        return HttpResponse("Not found")
