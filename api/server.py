from flask import Flask, request
from flask_cors import CORS
from transdictionaryhandler import TransDictionaryHandler

app = Flask(__name__)
CORS(app)

dictionary_handler = TransDictionaryHandler()

@app.route("/")
def health_check():
    return "Live!"


"""
Expected payload:
{
    "origin-language": a string value, either "ENG" or "ESP". This represents the language to be returned
    "mode": a string value, either "FLASHCARD" or "CONJUGATION", representing if we want to just practice the definitions of verbs, or verb conjugation
    "tenses" (optional): a list of strings, only required in conjugation mode, representing verb tenses to be practiced
    "subjects" (option): a list of strings, only read in conjugation mode but otherwise totally optional, representing subjects to conjugate for. If blank, use all
    "region" (optional): a string value, either "LATAM" or "ESP". Swaps "tu" for "vos" and includes "vosotros" in ESP mode
}

Expected output:
{
    "subject": the subject for the conjugation. null if in flashcard mode
    "verb-untranslated": the untranslated version of the verb, in the language provided in "origin-language" in the request.
    "tense": the tense of the verb's conjugation. null if in flashcard mode
    "verb-transated": the translated version of the verb, in the language not provided in "origin-language" in the request
    "infinitive": the infinitive form of the verb in Spanish
}
"""
@app.route("/flashcard", methods=["GET"])
def get_flashcard():
    return dictionary_handler.get_verb()

@app.route("/conjugation", methods=["GET"])
def get_conjugation():
    payload = request.args