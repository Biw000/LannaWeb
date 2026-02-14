import torch
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / "MobileNetV3-Large.pt"

model = None

def load_model():
    global model
    if model is None:
        print("Loading model...")
        model = torch.jit.load(str(MODEL_PATH), map_location="cpu")
        model.eval()
    return model
