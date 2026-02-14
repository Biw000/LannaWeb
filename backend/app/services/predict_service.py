from app.ml.model_loader import load_model
from app.ml.inference import predict
import torch

async def predict_image(file):
    model = load_model()

    image_bytes = await file.read()

    with torch.no_grad():
        result = predict(model, image_bytes)

    return result
