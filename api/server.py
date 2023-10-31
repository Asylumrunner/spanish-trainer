from flask import Flask, request
from flask_cors import CORS
from transdictionaryhandler import TransDictionaryHandler

app = Flask(__name__)
CORS(app)

dictionary_handler = TransDictionaryHandler()

@app.route("/")
def health_check():
    return "Live!"

@app.route("/flashcard", methods=["GET"])
def get_flashcard():
    return dictionary_handler.get_verb()

@app.route("/conjugation", methods=["POST"])
def get_conjugation():
    payload = request.args
    moods = payload['moods'] if 'moods' in payload else ['Indicativo', 'Subjunctivo']
    tenses = payload['tenses'] if 'tenses' in payload else ['Presente', 'Futuro', 'Imperfecto', 'PretÃ©rito', 'Condicional', 'Presente perfecto', 'Futuro perfecto', 'Pluscuamperfecto', 'PretÃ©rito anterior', 'Condicional perfecto']
    return dictionary_handler.get_conjugated_verb(moods, tenses)