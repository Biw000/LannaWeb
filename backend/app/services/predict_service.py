from app.ml.model_loader import load_model
from app.ml.inference import predict

_model = None

def predict_image(image):
    global _model

    if _model is None:
        print("🔥 Lazy loading model...")
        _model = load_model()

    return predict(_model, image)
