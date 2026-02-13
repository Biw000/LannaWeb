import torch
from pathlib import Path

def load_model():
    BASE_DIR = Path(__file__).resolve().parent
    MODEL_PATH = BASE_DIR / "MobileNetV3-Large.pt"

    print("MODEL PATH:", MODEL_PATH)
    print("EXISTS:", MODEL_PATH.exists())

    model = torch.jit.load(str(MODEL_PATH), map_location="cpu")
    model.eval()
    return model
