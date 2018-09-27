from django.http import HttpResponse
from django.views.generic import View
import datetime
from .utils import render_to_pdf


class GeneratePDF(View):
    def get(self, request, *args, **kwargs):
        context = {
            "invoice_number": "1",
            "today": datetime.date.today(),
            "amount": 39.99,
            "customer_name": "Cooper Mann",
            "order_id": 1233434,
        }
        pdf = render_to_pdf("invoice.html", context)
        if pdf:
            response = HttpResponse(pdf, content_type="application/pdf")
            filename = "Invoice_%s.pdf" % (12)
            content = "inline; filename='%s'" % (filename)
            response["Content-Disposition"] = content
            return response
        return HttpResponse("Not found")
