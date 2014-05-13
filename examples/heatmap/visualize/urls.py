from django.conf.urls import patterns, url, include
from .views import Visualize

urlpatterns = patterns('visualize',

       url(r'^visualize/$', Visualize.as_view()),
       url(r'^proxy/$', 'views.proxy_tunnel'),
       url(r'^retreive_data/$', 'views.retreive_data'),
)