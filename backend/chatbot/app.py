from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbotV2 import getAnswer


app = Flask(__name__)

CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        message = data.get('message', '')

        print("USER:", message)

        response = getAnswer(userInput=message)

        print("BOT:", response)

        return jsonify({'answer': response})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({'answer': "Backend error occurred"})

if __name__ == '__main__':
    app.run(debug=True)
