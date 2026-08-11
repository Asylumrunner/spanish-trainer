from flask import Flask, request
from flask_cors import CORS
from verb_data_manager import VerbDataManager

app = Flask(__name__)
CORS(app)

verb_data_manager = VerbDataManager()

@app.route("/")
def health_check():
    return "Live!"

@app.route("/flashcard", methods=["GET"])
def get_flashcard():
    common_only = request.args.get('common_only', 'false').lower() == 'true'
    return verb_data_manager.get_flashcard(common_only)

@app.route("/conjugation", methods=["POST"])
def get_conjugation():
    payload = request.get_json()
    moods = payload['moods'] if 'moods' in payload else ['Indicative', 'Subjunctive']
    tenses = payload['tenses'] if 'tenses' in payload else ['Present', 'Future', 'Imperfect', 'Preterite', 'Conditional', 'Present Perfect', 'Future Perfect', 'Past Perfect', 'Preterite (Archaic)', 'Conditional Perfect']
    common_only = payload.get('common_only', False)
    return verb_data_manager.get_conjugation(moods, tenses, common_only)

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)