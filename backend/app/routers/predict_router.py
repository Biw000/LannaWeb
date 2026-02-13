from fastapi import APIRouter, UploadFile, File
from app.services.predict_service import predict_image

router = APIRouter(
    prefix="/predict",
    tags=["Predict"]
)

@router.post("/")
async def predict(file: UploadFile = File(...)):
    return await predict_image(file)
