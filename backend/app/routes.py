from flask import Blueprint, request, jsonify
import os
from app.geese import SimpleCNN
from app.utils import transform
import torch
from PIL import Image

# Blueprint for API routes
api = Blueprint("api", __name__)

# Load the model once
device = torch.device('cuda' if torch.cuda.is_available() else 'mps' if torch.backends.mps.is_built() else 'cpu')
model = SimpleCNN().to(device)
model.load_state_dict(torch.load(os.path.join(os.path.dirname(__file__), 'simple_cnn_model.pth'), weights_only=True))
model.eval()

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

        # Preprocess the image
        image = Image.open(image_path)
        input_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(input_tensor)
            prediction = (output.squeeze() > 0.5).float()
        
        if prediction == 0:
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
