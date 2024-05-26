# your_app_name/urls.py

from django.urls import path
from .views import AudioProcessingView,live_AudioProcessingView,ModelTestingView

urlpatterns = [
    path('process-audio/', AudioProcessingView.as_view(), name='process_audio'),
    path('live-process-audio/', live_AudioProcessingView.as_view(), name='live_process_audio'),
    path('modeltest/',  ModelTestingView.as_view(), name='model_test')
]
