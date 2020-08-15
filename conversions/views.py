from .models import Conversion
from .serializers import ConversionSerializer
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser

from rest_framework.response import Response

from django.core.files.storage import FileSystemStorage

import pypandoc
from tidylib import tidy_document

import logging

logger = logging.getLogger(__name__)


from django.core.files import File
# Create your views here.

class ConversionListCreate(generics.ListCreateAPIView):
    queryset = Conversion.objects.all()
    serializer_class = ConversionSerializer

class ConversionUploadView(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        file_obj = request.data['file']
        # ...
        # do some stuff with uploaded file
        # ...

        # output = pypandoc.convert_file(file_obj, outputfile='demo.pdf')\

        newfile = Conversion.objects.create(name=file_obj.name)

        newfile.inputfile=file_obj
        # newfile.convertedfile = file_obj
        newfile.save()

        # logger.error(newfile.id)
        # logger.error(newfile.inputfile.name)

        output = pypandoc.convert_file("/code/DATA/input/" + str(newfile.id) + "/" + newfile.name ,
                               to='html5',
                               extra_args=['--extract-media=./DATA/converted/' + str(newfile.id)],
                               format='docx')

        output, errors = tidy_document(output)
        with open("/code/DATA/converted/" + str(newfile.id) + "/index.html", 'w') as f:
            f.write(output)
        

        f = open("/code/DATA/converted/" + str(newfile.id) + "/index.html")
        convertedfile = File(f)
     
        newfile.convertedfile = convertedfile
        logger.error(newfile.convertedfile.url)

        newfile.save()
        # logger.error(file_obj.name)

        # newfile = Conversion.objects.create(name="file5", inputfile=file_obj,  convertedfile=output)

        return Response(status=204)