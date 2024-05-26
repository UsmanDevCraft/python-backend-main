from rest_framework.decorators import api_view
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt

# audio_processing_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
import os
import pandas as pd
import subprocess
import torch
from .models import AudioModel
import os
import numpy

from torch import optim
from pytorch_lightning import Trainer
import soundfile as sf
from torch import optim
import pickle
import os
import base64
import torchaudio
from speechbrain.inference.separation import SepformerSeparation as separator

import pyaudio
import wave
from django.http import JsonResponse
from rest_framework import status


import torchaudio

class AudioProcessingView(APIView):
    parser_classes = (MultiPartParser,)
    def post(self, request):
        audio_file = request.FILES.get('audiofile')
        print(request.FILES)

        if audio_file:
            media_directory = 'media'
            os.makedirs(media_directory, exist_ok=True)
            save_path = os.path.join(media_directory, audio_file.name)
            save_path = f'media/audio.wav'
            with open(save_path, 'wb') as destination:
                for chunk in audio_file.chunks():
                    destination.write(chunk)

        file1,file2=runModel(save_path)
        
        with open(os.path.join(f'{file1}'), 'rb') as f:
            audio_data1 = f.read()
        with open(os.path.join(f'{file2}'), 'rb') as f:
            audio_data2 = f.read()
        
        # Encode audio files to base64
        audio_base64_1 = base64.b64encode(audio_data1).decode('utf-8')
        audio_base64_2 = base64.b64encode(audio_data2).decode('utf-8')
        
        # Return response
        return Response({"file1": audio_base64_1, "file2": audio_base64_2})
    
def runModel(path):
    audio = path
    model = separator.from_hparams(source="speechbrain/sepformer-whamr", savedir='wham_model')

    # for custom file, change path
    est_sources = model.separate_file(path=audio) 

    torchaudio.save("source1.wav", est_sources[:, :, 0].detach().cpu(), 8000)
    torchaudio.save("source2.wav", est_sources[:, :, 1].detach().cpu(), 8000)

    #2nd model 

    # model = separator.from_hparams(source="speechbrain/sepformer-whamr16k",savedir='whamr16k_model')
    # model = separator.from_hparams(source='whamr16k_model')

    # for custom file, change path
    # est_sources = model.separate_file(path=audio) 

    # torchaudio.save("source1.wav", est_sources[:, :, 0].detach().cpu(), 16000)
    # torchaudio.save("source2.wav", est_sources[:, :, 1].detach().cpu(), 16000)
 

    return "source1.wav", "source2.wav"

    



@csrf_exempt
@api_view(['POST'])
def live_audio(request):
    try:
        file = request.FILES['file']
        audio_model = AudioModel.objects.create(audio_file=file)
        audio_model.save()
        image_path = audio_model.audio_file.url
        # This is the path we set in settings - MEDIA_URL = '/uploads/'
        new_path = "."+image_path
        print("New Path", image_path)
        audio_response = ''
        # runModel(new_path)
        path1, path2 = runModel(new_path)
        # print(image_label)

        success_response = {
            'result': 'success',
            'message': 'File uploaded successfully',
            'audio_label': audio_response,
        }
        response = JsonResponse(success_response)
        response['Content-Disposition'] = f'attachment; filename="{file.name}"'
        file_response = FileResponse(file.open(), content_type='image/jpeg')  # Adjust content_type as needed
        response.streaming_content = file_response.streaming_content
        return response
    except Exception as e:
        print(e)
        error_response = {
            'result': 'error',
            'message': str(e),
        }
        return JsonResponse(error_response, status=500)
    
def record_audio(sample_rate, duration, output_filename):
    chunk = 1024
    format = pyaudio.paInt16
    channels = 1

    p = pyaudio.PyAudio()

    stream = p.open(format=format,
                    channels=channels,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk)

    print("Recording...")

    frames = []
    for i in range(0, int(sample_rate / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)

    print("Finished recording.")

    stream.stop_stream()
    stream.close()
    p.terminate()

    # Save the recorded audio to a temporary file
    output_directory = '../frontend/audio_processing_frontend/src/Components/'

    # Define the filename
    output_filename = output_directory + 'recorded.wav'
    
    with wave.open(output_filename, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(p.get_sample_size(format))
        wf.setframerate(sample_rate)
        wf.writeframes(b''.join(frames))

    # Read the temporary file and encode it in base64
    with open(output_filename, 'rb') as audio_file:
        encoded_audio = base64.b64encode(audio_file.read()).decode('utf-8')
    return encoded_audio

class ModelTestingView(APIView):
    parser_classes = (MultiPartParser,)
    def post(self,request):
        if request.method == 'POST':
            sample_rate = 8000  # Set the sample rate to 8000Hz
            duration = 3  # Set the duration of the recording in seconds
            output_filename = "recorded.wav"

            output_file = record_audio(sample_rate, duration, output_filename)

            return Response({'output_file': output_file})

        return Response({'error': 'Invalid request method'}, status=400)


class live_AudioProcessingView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        audio_base64 = request.data.get('audiofile')  # Assuming audiofile is sent as base64 data
        if audio_base64:
            # Decode base64 data
            audio_data = base64.b64decode(audio_base64)
            
            # Save decoded audio to a file
            media_directory = 'media'
            os.makedirs(media_directory, exist_ok=True)
            save_path = os.path.join(media_directory, 'audio_received.wav')
            try:
                with open(save_path, 'wb') as destination:
                    destination.write(audio_data)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Process the audio using your model
            try:
                file1, file2 = runModel(save_path)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Read processed audio files
            try:
                with open(file1, 'rb') as f:
                    audio_data1 = f.read()
                with open(file2, 'rb') as f:
                    audio_data2 = f.read()
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Encode processed audio files to base64
            audio_base64_1 = base64.b64encode(audio_data1).decode('utf-8')
            audio_base64_2 = base64.b64encode(audio_data2).decode('utf-8')

            # Return response
            return Response({"file1": audio_base64_1, "file2": audio_base64_2})
        else:
            return Response({"error": "No audio data received"}, status=status.HTTP_400_BAD_REQUEST)