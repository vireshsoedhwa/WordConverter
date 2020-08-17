from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('conversion', views.ConversionListCreate.as_view() ),
    # url(r'/upload/(?P<filename>[^/]+)$', views.ConversionUploadView.as_view()),
    url(r'upload', views.ConversionUploadAndSave.as_view()),
    path('media', views.ConversionHTMLfile.as_view() ),
    path('<int:id>/media/<targetfile>', views.ConversionImage),
    path('<int:id>/html', views.DownloadHTMLFile),
    # path('delete', views.DeleteHtml.as_view())
    url(r'^delete/$', views.DeleteHtml.as_view())
]
