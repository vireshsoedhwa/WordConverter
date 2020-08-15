from rest_framework import serializers
from .models import Conversion

class ConversionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversion
        fields = ('id', 'name', 'convertedfile', 'inputfile')