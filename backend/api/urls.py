# your_app_name/urls.py

from django.urls import path
from .views import AudioProcessingView,live_audio

urlpatterns = [
    path('process-audio/', AudioProcessingView.as_view(), name='process_audio'),
    path('live-process-audio/', live_audio, name='live_process_audio'),
]
