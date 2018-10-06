import json
import sendgrid

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf import settings
from POSserver.POSserver.views import GeneratePDF
from POSserver.server.models.job import Job
from sendgrid.helpers.mail import *


def send_email(req):
    body = json.loads(req.body.decode('utf-8'))
    job = Job.objects.get(pk=from_global_id(req["job"])[1])
    user = User.objects.get(pk=job.user_id)
    client = Client.objects.filter(pk=job.client_id).get()
    user_name = body['userName']
    user_email = body['userEmail']
    job_name = body['jobName']
    order_id = body['jobId']
    client_name = body['clientFirstName']
    client_email = body['clientEmail']

    sg = sendgrid.SendGridAPIClient(apikey=config.('SENDGRID_API_KEY'))

    from_email = Email(user_email)
    to_email = Email(client_email)
    subject = f'New invoice from {user_name}'
    attachment = Attachment()
    attachment.type = 'application/pdf'
    attachment.filename = 'Invoice_%s.pdf'

  content = Content(
    'text/html',
    f'''
    <p>Hi <b>{client_name}</b></p>
    <p>You have a new invoice from <b>{user_name}</b>. To view your invoice, open the attached PDF.</p> 
    '''
  )

  mail = Mail(from_email, subject, to_email, content)
  response = sg.client.mail.send.post(request_body=mail.get())
 
 return HttpResponse()
