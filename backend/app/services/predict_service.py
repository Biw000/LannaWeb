from app.ml.model_loader import load_model
from app.ml.inference import predict
import torch
import gc

async def predict_image(file):
    model = load_model()

    image_bytes = await file.read()

    with torch.no_grad():
        result = predict(model, image_bytes)

    # 🔥 STEP 8 — ลบตัวแปรที่ไม่ใช้แล้ว
    del model
    del image_bytes
    gc.collect()

    return result
