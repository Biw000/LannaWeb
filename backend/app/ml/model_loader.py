import torch
from pathlib import Path

def load_model():
    BASE_DIR = Path(__file__).resolve().parents[2]
    MODEL_PATH = BASE_DIR / "ml" / "MobileNetV3-Large.pt"

    model = torch.jit.load(str(MODEL_PATH), map_location="cpu")
    model.eval()
    return model
