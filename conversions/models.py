from django.db import models
from django.core.files.storage import FileSystemStorage
# Create your models here.

# fs = FileSystemStorage(location='uploads/')

def file_directory_path(instance, filename):
    return 'input/{0}/{1}'.format(instance.id, "doc")


class Conversion(models.Model):
    name = models.CharField(max_length=100)
    inputfile = models.FileField(upload_to=file_directory_path)
    convertedfile = models.FileField(upload_to='converted/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


