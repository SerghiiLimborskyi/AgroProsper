from flask import Flask, request, jsonify
from datetime import datetime
import json

app = Flask(__name__)
DATA_FILE = 'referral_log.json'

@app.route('/api/referral-transition', methods=['POST'])
def referral_transition():
    data = request.get_json()

    # Валідація
    if not data or 'referral_tag' not in data:
        return jsonify({'status': 'error', 'message': 'Invalid data'}), 400

    # Додавання часу сервера
    data['server_received'] = datetime.utcnow().isoformat()

    # Збереження у файл
    try:
        with open(DATA_FILE, 'a') as f:
            f.write(json.dumps(data) + '\n')
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

    return jsonify({'status': 'success', 'data': data}), 200

if __name__ == '__main__':
    app.run(debug=True)
