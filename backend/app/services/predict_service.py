from app.ml.model_loader import load_model
from app.ml.inference import predict

# โหลด model ครั้งเดียว
model = load_model()

def predict_image(image):
    result = predict(model, image)
    return result
