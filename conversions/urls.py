from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('conversion', views.ConversionListCreate.as_view() ),
    # url(r'/upload/(?P<filename>[^/]+)$', views.ConversionUploadView.as_view()),
    url(r'upload', views.ConversionUploadAndSave.as_view()),
    path('media', views.ConversionHTMLfile.as_view() ),
]