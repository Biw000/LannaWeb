from app.ml.model_loader import load_model
from app.ml.inference import predict

model = load_model()

async def predict_image(file):
    image_bytes = await file.read()
    result = predict(model, image_bytes)
    return result
