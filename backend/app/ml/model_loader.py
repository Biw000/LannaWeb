import torch
from pathlib import Path

_model = None

def get_model_path():
    BASE_DIR = Path(__file__).resolve().parent
    model_path = BASE_DIR / "MobileNetV3-Large.pt"
    return model_path

def load_model():
    global _model
    if _model is None:
        model_path = get_model_path()
        if not model_path.exists():
            raise FileNotFoundError(f"Model not found at {model_path}")
        
        print("🔥 Loading model from:", model_path)
        _model = torch.jit.load(str(model_path), map_location="cpu")
        _model.eval()
    return _model
