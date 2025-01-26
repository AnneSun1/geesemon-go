from flask import Blueprint, request, jsonify
import os
from app.geese import SimpleCNN
from app.utils import transform
import torch
from PIL import Image
from inference_sdk import InferenceHTTPClient

# Blueprint for API routes
api = Blueprint("api", __name__)

# Load the CLIENT for external API
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="h7ILd0bkSGAYvS4u3Ns7"
)

# External prediction function
def external_prediction(image_path:str)->int:
    predictions = CLIENT.infer(image_path, model_id="canadian-geese-detector/1")["predictions"]
    length = len(predictions)
    if length == 0:
        return 0
    val = 1
    for item in predictions:
        if item["class"] == "Baby Canada Goose":
            return 2
    return val

# Load the local model
device = torch.device('cuda' if torch.cuda.is_available() else 'mps' if torch.backends.mps.is_built() else 'cpu')
model = SimpleCNN().to(device)
model.load_state_dict(torch.load(os.path.join(os.path.dirname(__file__), 'simple_cnn_model.pth'), weights_only=True))
model.eval()

# Local prediction function
def local_prediction(input_tensor)->str:
    with torch.no_grad():
        output = model(input_tensor)
        print(output)
        local_prediction = (output.squeeze() > 0.5).float()
        if local_prediction == 0:
            return "goose"
        else:
            return "not goose"

# @api.route("/get-data", methods=["GET"])
@api.route("/amigoated", methods=["GET"])
def amigoated():
    return jsonify({"status": "Server is running"}), 200

# Endpoint for image classification
@api.route("/classify", methods=["POST"])
def classify():
    try:
        # Check if an image is uploaded
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        # Save and process the image
        image = request.files["image"]
        image_path = f"temp_{image.filename}"
        image.save(image_path)

        # Check the file size in MB
        # size_in_bytes = os.path.getsize(image_path)
        # size_in_mb = size_in_bytes / (1024 * 1024)  # Convert bytes to MB

        # Preprocess the image
        image = Image.open(image_path)
        input_tensor = transform(image).unsqueeze(0).to(device)

        if image.width < 250 or image.height < 250:
            label = local_prediction(input_tensor)
            return jsonify({"label": label}), 200

        elif image.width > 640 or image.height > 640:
            image = image.resize((640, 640), Image.Resampling.LANCZOS)
            image.save(image_path)

        # External prediction
        label = local_prediction(input_tensor) #"label goose if goose and not goose is not goose"
        external_pred:int = external_prediction(image_path) #0 if no geese, 1 if only adult geese, 2 if baby goose spotted
        if external_pred == 2:
            label = "baby goose"
        elif external_pred == 1:
            label = "goose"
        else:
            label = "not goose"

        # Remove temporary file
        os.remove(image_path)

        # Return the result
        print(label)
        return jsonify({"label": label}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
