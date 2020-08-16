from .models import Conversion
from .serializers import ConversionSerializer
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser

from rest_framework.response import Response

from django.core.files.storage import FileSystemStorage

import pypandoc
from tidylib import tidy_document

import logging
import os

logger = logging.getLogger(__name__)

from django.core.files import File

from rest_framework.decorators import api_view
from rest_framework.renderers import StaticHTMLRenderer
from rest_framework import renderers

from django.http import HttpResponse
from django.http import FileResponse

from django.shortcuts import render

from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class ConversionListCreate(generics.ListCreateAPIView):
    queryset = Conversion.objects.all().order_by('-id')[:8]
    serializer_class = ConversionSerializer



class ConversionHTMLfile(generics.ListCreateAPIView):
    queryset = Conversion.objects.all()
    serializer_class = ConversionSerializer
    
    renderer_classes = [StaticHTMLRenderer]
    @xframe_options_exempt
    def get(self, request, format=None):
        selected = Conversion.objects.get(pk=request.query_params['doc'])
        with open(selected.convertedfile.path, 'r') as file:
            data = file.read()        
        return Response(data)



def ConversionImage(request, id, targetfile):
    # logger.error(id)
    # logger.error(targetfile)
    response = FileResponse(open("/code/DATA/converted/" + str(id) + "/media/" + targetfile, 'rb'))
    return response

class ConversionUploadAndSave(APIView):
    parser_classes = [MultiPartParser]

    @csrf_exempt
    def post(self, request, format=None):
        file_obj = request.data['file']

        # logger.error(request.method)
        # logger.error(request.FILES['file'])
        logger.error(file_obj.name)

        # logger.error(request.data['filetype'])
        # logger.error(request.data['LastModified'])

        if not os.path.exists('/code/DATA/'):
            os.makedirs('/code/DATA/')

        if not os.path.exists('/code/DATA/converted/'):
            os.makedirs('/code/DATA/converted/')

        newfile = Conversion.objects.create(name=file_obj.name)

        newfile.inputfile=file_obj
        newfile.save()

        try:
            output = pypandoc.convert_file("/code/DATA/input/" + str(newfile.id) + "/doc",
                        to='html5',
                        extra_args=['--extract-media=/code/DATA/converted/' + str(newfile.id)],
                        format='docx')
        
            if not os.path.exists('/code/DATA/converted/' + str(newfile.id) ):
                os.makedirs('/code/DATA/converted/' + str(newfile.id))

            output, errors = tidy_document(output)
            with open("/code/DATA/converted/" + str(newfile.id) + "/index.html", 'w') as f:
                f.write(output)
        except:
            logger.error("Conversion failed")

        f = open("/code/DATA/converted/" + str(newfile.id) + "/index.html")
        convertedfile = File(f)     
        newfile.convertedfile = convertedfile
        newfile.save()

        return Response(status=204)