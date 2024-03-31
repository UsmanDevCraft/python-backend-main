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

from torch import optim
from pytorch_lightning import Trainer
import soundfile as sf
from torch import optim
import pickle
import os
import base64
import numpy as np
import soundfile as sf
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks

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
    # Passing the audio file path to the best_model.sav file to split the audio file into 2 files and then saving and returing the path of the file with the voice

    # model = pd.read_pickle(os.path.join('Best_Model.sav'))
    # model.separate(path, force_overwrite=True,resample=True)
    # pathList=path.split("/")
    # file,exe=pathList[-1].split(".")
    # return "/".join(pathList[:-1])+"/"+file+"_est1."+exe,"/".join(pathList[:-1])+"/"+file+"_est2."+exe
#     input = "audio.wav"
# separation = pipeline(
#    Tasks.speech_separation,
#    model='damo/speech_mossformer2_separation_temporal_8k')
# result = separation(input)
# for i, signal in enumerate(result['output_pcm_list']):
#     save_file = f'output_spk{i}.wav'
#     sf.write(save_file, numpy.frombuffer(signal, dtype=numpy.int16), 8000)
    

    audio_file = path  # Rename 'input' variable to 'audio_file' or any other suitable name
    separation = pipeline(
        Tasks.speech_separation,
        model='damo/speech_mossformer2_separation_temporal_8k'
    )
    result = separation(audio_file)

    for i, signal in enumerate(result['output_pcm_list']):
        save_file = f'output_spk{i}.wav'
        sf.write(save_file, np.frombuffer(signal, dtype=np.int16), 8000)
    return f"{"output"}_spk0.{"wav"}", f"{"output"}_spk1.{"wav"}"



@csrf_exempt
@api_view(['POST'])
def live_audio(request):
    audio_url = request.data.get('audio_url')

    if audio_url:
            # Save the audio file locally
        media_directory = 'media'
        os.makedirs(media_directory, exist_ok=True)
        save_path = os.path.join(media_directory, 'audio.wav')

        with open(save_path, 'wb') as f:
            f.write(audio_url.content)

        # Process the audio file as needed
        file1, file2 = runModel(save_path)
        
        # Encode audio files to base64
        with open(file1, 'rb') as f1, open(file2, 'rb') as f2:
            audio_data1 = f1.read()
            audio_data2 = f2.read()

        audio_base64_1 = base64.b64encode(audio_data1).decode('utf-8')
        audio_base64_2 = base64.b64encode(audio_data2).decode('utf-8')

        # Return response
        return Response({"file1": audio_base64_1, "file2": audio_base64_2})