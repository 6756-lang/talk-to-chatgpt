from flask import Flask, render_template, request, jsonify, send_file
import openai
import os
from gtts import gTTS
import uuid

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set this in Render's environment variables

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": question}]
    )
    answer = response["choices"][0]["message"]["content"]

    # Convert answer to speech
    tts = gTTS(text=answer)
    filename = f"response_{uuid.uuid4().hex}.mp3"
    filepath = os.path.join("static", filename)
    tts.save(filepath)

    return jsonify({"answer": answer, "audio_url": f"/static/{filename}"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
