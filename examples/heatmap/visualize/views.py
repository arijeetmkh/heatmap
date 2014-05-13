from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.generic import TemplateView
from record import models as rm


from bs4 import BeautifulSoup

import requests, json, pdb

class Visualize(TemplateView):

    template_name = 'visualize/visualize.html'
    # def get(self, *args, **kwargs):
    # #
    #     f = open(name='/home/redskins80/project-wingify/heatmap/wingify/test.html', mode='r')
    # #     # r = requests.get('http://www.w3schools.com')
    # #     # soup = BeautifulSoup(r.text)
    # #     # first_child = soup.body.children.next()
    # #     # container = soup.new_tag('div', id='container')
    # #     # first_child.insert_before(container)
    # #     #
    # #     # javascript = soup.new_string('alert("BS!")')
    # #     # script_tag = soup.new_tag('script')
    # #     # script_tag.append(javascript)
    # #     #
    # #     # soup.body.append(script_tag)
    # #     # pdb.set_trace()
    #     return HttpResponse(f.read())


def proxy_tunnel(request):

    # Replace with existing static HTML content saved to a file
    f = open(name='/home/redskins80/project-wingify/examples/heatmap/wingify/test.html', mode='r')

    return HttpResponse(content=f.read())


def retreive_data(request):

    return_dict = {}
    for pos in rm.Position.objects.all():

        xpath = pos.xpath.str
        if return_dict.has_key(xpath):
            return_dict[xpath]['positions'].append([float(pos.x), float(pos.y)])
        else:
            return_dict[xpath] = {
                'clicks':pos.xpath.clicks,
                'positions':[[float(pos.x), float(pos.y)]]
            }

    return HttpResponse(content=json.dumps(return_dict), content_type='text/json')
