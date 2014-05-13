from django.http import HttpResponse
from django.views.generic import View
from  . import models as rm

import pdb

class RecordData(View):

    def get(self, request, *args, **kwargs):

        xpath = request.GET['xpath']
        xratio = request.GET['xratio']
        yratio = request.GET['yratio']

        XP, created = rm.XPath.objects.get_or_create(str=xpath)
        XP.clicks = XP.clicks + 1
        XP.save()

        pos = rm.Position(x=xratio, y=yratio)
        pos.xpath = XP
        pos.save()

        return HttpResponse(status=201, content_type='text/img')
