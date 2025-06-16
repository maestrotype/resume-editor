from flask import Flask, request, jsonify
from gemini_helper import generate_summary
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route('/api/improve', methods=['POST'])
# def api_improve():
#     data = request.get_json()
#     text = data.get('text', '')
#     improved = improve_text(text)
#     return jsonify({'suggestion': improved})

@app.route("/api/autogen", methods=["POST"])
def autogen():
    data = request.get_json()
    title = data.get("title", "")
    position = data.get("position", "")
    skills = data.get("skills", [])

    summary = generate_summary(skills, title, position)
    return jsonify({ "summary": summary })

if __name__ == '__main__':
    app.run(debug=True)
