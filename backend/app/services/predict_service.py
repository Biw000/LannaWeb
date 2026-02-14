from app.ml.model_loader import load_model
from app.ml.inference import predict
import torch

# โหลด model ครั้งเดียว
model = load_model()

async def predict_image(image):
    try:
        with torch.no_grad():
            result = predict(model, image)
        return result
    except Exception as e:
        return {
            "error": str(e)
        }
