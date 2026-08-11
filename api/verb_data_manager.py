import csv
import random

class VerbDataManager():
    def __init__(self):
        with open("./db/common_verbs.txt", "r", encoding='utf-8-sig') as commonfile:
            self.common_verbs = {line.strip() for line in commonfile if line.strip()}

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

    def _filter_common(self, entries):
        return [entry for entry in entries if entry["infinitive"] in self.common_verbs]

    def get_flashcard(self, common_only=False):
        pool = list(self.mappings["Infinitive"].values())
        if common_only:
            pool = self._filter_common(pool)
        return random.choice(pool)

    def get_conjugation(self, moods, tenses, common_only=False):
        mood = random.choice(moods)
        tense = random.choice([tense for tense in tenses if (tense in self.mappings[mood])])
        pool = list(self.mappings[mood][tense].values())
        if common_only:
            pool = self._filter_common(pool)
        return random.choice(pool)
