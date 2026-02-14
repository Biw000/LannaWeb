from app.ml.model_loader import load_model
from app.ml.inference import predict

async def predict_image(file):
    model = load_model()  
    image_bytes = await file.read()
    result = predict(model, image_bytes)
    return result
