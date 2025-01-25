from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import torch
import torchvision.transforms as transforms
from PIL import Image
from io import BytesIO

# model = tf.keras.models.load_model('app/my_model.keras')
print("Model Loaded")

# class_names = np.array(['Organics', 'Recycables'])

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/')
def reed_root(): #root
    return {'message': 'Welcome to Wastely'}

# @app.post('/camera-image')
# async def predict(image: UploadFile):

# @app.post('/predict')
# async def predict(image: UploadFile):
#     image_bytes = await image.read()
    
#     # Example: Save the file locally (optional)
#     with open("uploaded_image.jpg", "wb") as f:
#         f.write(image_bytes)

#     from PIL import Image
#     import io
#     import numpy as np

#     img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
#     img = img.resize((128, 128))  # Resize to model's input size
#     img_array = np.array(img)
#     img_array = np.expand_dims(img_array, axis=0)  # Model input shape

#     prediction = model.predict(img_array)
#     class_name = class_names[np.argmax(prediction)]

#     return {'predicted_class': class_name}