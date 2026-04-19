from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from PIL import Image, UnidentifiedImageError
import pytesseract

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ROLE_KEYWORDS = {
    "doctor": ["doctor", "dr", "médecin", "medecin", "physician"],
    "nurse": ["nurse", "infirmier", "infirmière", "infirmiere"],
    "physiotherapist": [
        "kine",
        "kiné",
        "kinesitherapeute",
        "kinésithérapeute",
        "physiotherapist",
        "physical therapist",
    ],
}


def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def detect_role(text: str):
    normalized = normalize_text(text)

    for role, keywords in ROLE_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in normalized:
                return role
    return None


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "Verification API is running"
    }), 200


@app.route("/verify-document", methods=["POST"])
def verify_document():
    if "document" not in request.files:
        return jsonify({
            "success": False,
            "message": "No document uploaded"
        }), 400

    file = request.files["document"]

    if not file or file.filename == "":
        return jsonify({
            "success": False,
            "message": "Empty filename"
        }), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        image = Image.open(filepath)
        extracted_text = pytesseract.image_to_string(image)

        detected_role = detect_role(extracted_text)
        verification_status = "BASIC_VERIFIED" if detected_role else "UNVERIFIED"

        return jsonify({
            "success": True,
            "verification_status": verification_status,
            "detected_role": detected_role,
            "message": "Verification completed",
            "extracted_text": extracted_text,
        }), 200

    except UnidentifiedImageError:
        return jsonify({
            "success": False,
            "message": "Uploaded file is not a valid image"
        }), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)