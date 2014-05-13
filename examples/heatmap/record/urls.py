from django.conf.urls import url, include, patterns
from .views import RecordData

urlpatterns = patterns('',

    url(r'^record/$',RecordData.as_view()),

)