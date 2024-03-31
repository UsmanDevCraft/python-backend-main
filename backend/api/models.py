from django.db import models

# Create your models here.
class AudioModel(models.Model):
    audio_file = models.FileField(upload_to='audio_files')