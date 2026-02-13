import torch
from app.config import settings

def load_model():
    model = torch.jit.load(settings.MODEL_PATH, map_location="cpu")
    model.eval()
    return model
