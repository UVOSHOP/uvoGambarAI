from flask import Flask, request, send_file
from PIL import Image, ImageDraw, ImageFont
import io
import random

app = Flask(__name__)

@app.route("/generate")
def generate():
    prompt = request.args.get("prompt", "AI")
    img = Image.new("RGB", (1080, 1080), color=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))
    draw = ImageDraw.Draw(img)
    draw.text((50, 500), prompt, fill="white")

    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    return send_file(img_bytes, mimetype='image/png')

if __name__ == "__main__":
    app.run(port=5000)
