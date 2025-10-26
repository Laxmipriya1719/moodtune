import io
import base64
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from keras.models import load_model
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# ---- Load model & helpers once on startup ----
MODEL_PATH = "models/fer2013_mini_XCEPTION.102-0.66.hdf5"
model = load_model(MODEL_PATH, compile=False)

emotions = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# ---------- Helpers ----------
def read_image_from_request(req) -> np.ndarray:
    """Extract image from multipart/form-data or JSON base64."""
    if 'image' in req.files:
        file = req.files['image']
        image_bytes = file.read()
    else:
        data = req.get_json(silent=True) or {}
        b64 = data.get('image_base64')
        if not b64:
            raise ValueError("No image provided. Use multipart 'image' or JSON 'image_base64'.")
        if "," in b64:  # strip "data:image/png;base64,"
            b64 = b64.split(",", 1)[1]
        image_bytes = base64.b64decode(b64)

    pil_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return np.array(pil_img)  # RGB np array

def detect_emotions(rgb_img: np.ndarray):
    """Detect all faces, run model, return list of {box, emotion, probabilities}."""
    gray = cv2.cvtColor(rgb_img, cv2.COLOR_RGB2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    results = []
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_gray = cv2.resize(roi_gray, (64, 64))
        roi = roi_gray.astype("float32") / 255.0
        roi = np.expand_dims(roi, axis=(0, -1))  # shape (1,64,64,1)

        preds = model.predict(roi, verbose=0)[0]
        top_idx = int(np.argmax(preds))
        label = emotions[top_idx]
        probs = {emotions[i]: float(round(preds[i], 4)) for i in range(len(emotions))}

        results.append({
            "box": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)},
            "emotion": label,
            "probabilities": probs
        })

    return results

# ---------- Routes ----------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/labels", methods=["GET"])
def labels():
    return jsonify({"labels": emotions}), 200

@app.route("/detect-emotion", methods=["POST"])
def detect():
    try:
        rgb = read_image_from_request(request)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

    results = detect_emotions(rgb)
    return jsonify({"status": "success", "faces": results}), 200

@app.route("/analyze-text", methods=["POST"])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text.strip():
            return jsonify({"status": "error", "message": "No text provided"}), 400

        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # -1 to +1

        if polarity > 0.3:
            mood = "Happy"
        elif polarity < -0.3:
            mood = "Sad"
        else:
            mood = "Neutral"

        return jsonify({
            "status": "success",
            "faces": [{
                "emotion": mood,
                "probabilities": {
                    "Happy": max(0.0, round(polarity, 2)),
                    "Sad": max(0.0, round(-polarity, 2)),
                    "Neutral": round(1 - abs(polarity), 2)
                },
                "box": None
            }]
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ✅ Home route for Render deployment
@app.route("/")
def home():
    return "🎵 MoodTune backend is running successfully on Render!"

# ---------- Run server ----------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True, threaded=True)
