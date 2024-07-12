from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)  

API_KEY = os.getenv('ANTHROPIC_API_KEY')  

@app.route('/api/message', methods=['POST', 'OPTIONS'])
def get_message():
    if request.method == 'OPTIONS':
        
        return '', 200

    data = request.json
    user_message = data.get('message')

    headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }

    payload = {
        "model": "claude-3-5-sonnet-20240620",
        "max_tokens": 1024,
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    response = requests.post('https://api.anthropic.com/v1/messages', headers=headers, json=payload)
    response_json = response.json()

    return jsonify(response_json)

if __name__ == '__main__':
    app.run(debug=True, port=5002)