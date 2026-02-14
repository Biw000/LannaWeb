from app.ml.model_loader import load_model
from app.ml.inference import predict

_model = None

def get_model():
    global _model
    if _model is None:
        print("Loading model...")
        _model = load_model()
    return _model


def predict_image(image):
    model = get_model()
    return predict(model, image)
