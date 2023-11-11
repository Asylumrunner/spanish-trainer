import csv
import random

class VerbDataManager():
    def __init__(self):
        with open("./db/jehle_verb_database.csv", "r", encoding='utf-8-sig') as csvfile:
            reader = csv.DictReader(csvfile)
            self.mappings = {
                "Infinitive" : {},
                "Indicative" : {
                    "Present": {},
                    "Future": {},
                    "Imperfect": {},
                    "Preterite": {},
                    "Conditional": {},
                    "Present Perfect": {},
                    "Future Perfect": {},
                    "Past Perfect": {},
                    "Preterite (Archaic)": {},
                    "Conditional Perfect": {}
                },
                "Subjunctive": {
                    "Present": {},
                    "Imperfect": {},
                    "Future": {},
                    "Present Perfect": {},
                    "Future Perfect": {},
                    "Past Perfect": {},
                },
                "Imperative Affirmative": {
                    "Present": {}
                },
                "Imperative Negative": {
                    "Present": {}
                }
            }

            for row in reader:
                self.mappings["Infinitive"][row["infinitive"]] = {
                    "infinitive": row["infinitive"],
                    "infinitive_english": row["infinitive_english"]
                }
                self.mappings[row["mood_english"]][row["tense_english"]][row["infinitive"]] = row

    def get_flashcard(self):
        return random.choice(list(self.mappings["Infinitive"].values()))

    def get_conjugation(self, moods, tenses):
        mood = random.choice(moods)
        tense = random.choice([tense for tense in tenses if (tense in self.mappings[mood])])
        return random.choice(list(self.mappings[mood][tense].values()))

            