from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.config import settings
from app.routers.predict_router import router as predict_router


# =========================
# Create App
# =========================
app = FastAPI(
    title="Flower Veg Enterprise API",
    docs_url="/docs",
    redoc_url=None
)
# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ชั่วคราวเพื่อทดสอบ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Create Database Tables
# =========================
Base.metadata.create_all(bind=engine)


# =========================
# Routers
# =========================
app.include_router(predict_router)


# =========================
# Health Check
# =========================
@app.get("/")
def root():
    return {"status": "API Running"}
