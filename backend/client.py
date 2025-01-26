import json
import requests
from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from PIL import Image

with open("./carrot.jpg", "rb") as f:
    file_content = f.read()

file_obj = BytesIO(file_content)
# data = {'image': [] }

url = 'http://0.0.0.0:8080/predict/'

# data = json.dumps(data)
response = requests.post(url, file_obj)
print(response.json())