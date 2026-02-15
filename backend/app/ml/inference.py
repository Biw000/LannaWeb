import torch
from torchvision import transforms
import json
import os

# โหลด class names
BASE_DIR = os.path.dirname(__file__)
with open(os.path.join(BASE_DIR, "classes.json"), "r", encoding="utf-8") as f:
    CLASS_NAMES = json.load(f)

# transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict(model, image):
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        probabilities = torch.softmax(outputs, dim=1)
        top_prob, top_class = torch.topk(probabilities, 3)

    results = []
    for i in range(3):
        results.append({
            "class_name": CLASS_NAMES[top_class[0][i].item()],
            "confidence": round(top_prob[0][i].item(), 4)
        })

    return {
        "best_prediction": results[0],
        "top3": results
    }
