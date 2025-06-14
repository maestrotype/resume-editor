from flask import Flask, request, jsonify
from gemini_helper import improve_text, generate_summary
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/improve', methods=['POST'])
def api_improve():
    data = request.get_json()
    text = data.get('text', '')
    improved = improve_text(text)
    return jsonify({'suggestion': improved})

@app.route('/api/generate', methods=['POST'])
def api_generate():
    data = request.get_json()
    skills = data.get('skills', [])
    years = data.get('years', '')
    focus = data.get('focus', '')
    summary = generate_summary(skills, years, focus)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
