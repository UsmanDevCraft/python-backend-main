import pandas as pd
def runModel(path):
    # Passing the audio file path to the best_model.sav file to split the audio file into 2 files and then saving and returing the path of the file with the voice
    model = pd.read_pickle('backend/Best_Model.sav')
    model.separate(path, force_overwrite=True,resample=True)
    pathList=path.split("/")
    file,exe=pathList[-1].split(".")
    return "/".join(pathList[:-1])+"/"+file+"_est1."+exe,"/".join(pathList[:-1])+"/"+file+"_est2."+exe

output=runModel("audio.wav")
print(output)