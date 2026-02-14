from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io

from app.services.predict_service import predict_image

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        predicted_class, confidence = await predict_image(image)

        return {
            "predicted_class": predicted_class,
            "confidence": round(float(confidence), 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
