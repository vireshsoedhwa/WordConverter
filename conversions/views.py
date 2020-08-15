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

# Create your views here.

class ConversionListCreate(generics.ListCreateAPIView):
    queryset = Conversion.objects.all()
    serializer_class = ConversionSerializer



class ConversionHTMLfile(generics.ListCreateAPIView):
    queryset = Conversion.objects.all()
    serializer_class = ConversionSerializer
    
    renderer_classes = [StaticHTMLRenderer]

    def get(self, request, format=None):
        selected = Conversion.objects.get(pk=request.query_params['doc'])
        with open(selected.convertedfile.path, 'r') as file:
            data = file.read()        
        return Response(data)




class ConversionUploadView(APIView):
    parser_classes = [MultiPartParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        # ...
        # do some stuff with uploaded file
        # ...

        logger.error(file_obj)

        # if not os.path.exists('/code/DATA/'):
        #     os.makedirs('/code/DATA/')

        # newfile = Conversion.objects.create(name=file_obj.name)

        # newfile.inputfile=file_obj
        # newfile.save()


        # output = pypandoc.convert_file("/code/DATA/input/" + str(newfile.id) + "/" + newfile.name ,
        #                        to='html5',
        #                        extra_args=['--extract-media=/code/DATA/converted/' + str(newfile.id)],
        #                        format='docx')

        # output, errors = tidy_document(output)
        # with open("/code/DATA/converted/" + str(newfile.id) + "/index.html", 'w') as f:
        #     f.write(output)
        

        # f = open("/code/DATA/converted/" + str(newfile.id) + "/index.html")
        # convertedfile = File(f)
     
        # newfile.convertedfile = convertedfile
        # logger.error(newfile.convertedfile.url)

        # newfile.save()

        return Response(status=204)


class ConversionUploadAndSave(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file_obj = request.data['file']

        logger.error(request.method)
        logger.error(request.FILES['file'])
        logger.error(file_obj)

        if not os.path.exists('/code/DATA/'):
            os.makedirs('/code/DATA/')

        newfile = Conversion.objects.create(name=file_obj.name)

        newfile.inputfile=file_obj
        newfile.save()


        output = pypandoc.convert_file("/code/DATA/input/" + str(newfile.id) + "/" + newfile.name ,
                               to='html5',
                               extra_args=['--extract-media=/code/DATA/converted/' + str(newfile.id)],
                               format='docx')

        output, errors = tidy_document(output)
        with open("/code/DATA/converted/" + str(newfile.id) + "/index.html", 'w') as f:
            f.write(output)
        

        f = open("/code/DATA/converted/" + str(newfile.id) + "/index.html")
        convertedfile = File(f)
     
        newfile.convertedfile = convertedfile
        logger.error(newfile.convertedfile.url)

        newfile.save()

        return Response(status=204)