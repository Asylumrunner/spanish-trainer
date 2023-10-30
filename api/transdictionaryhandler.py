import sqlite3

class TransDictionaryHandler():
    def __init__(self):
        self.con = sqlite3.connect("./db/translations.db", check_same_thread=False)
        self.cursor = self.con.cursor()
        self.execute_startup_script()

    def execute_startup_script(self):
        with open('./db/jehle_verb_sqlite3.sql', 'r') as startup_file:
            startupSql = startup_file.read()
        
        startupCommands = startupSql.split(';')

        for command in startupCommands:
            try:
                self.cursor.execute(command)
            except Exception as e:
                print("Exception in executing command: {}".format(e))

    # Returns an unconjugated verb. For flashcard mode
    def get_verb(self):
        db_response = self.cursor.execute("SELECT * FROM infinitive ORDER BY random() LIMIT 1").fetchone()
        response = {
            "verb-spanish": db_response[0],
            "verb-english": db_response[1]
        }
        return response
    
    # Returns a conjugated verb. For conjugation mode
    def get_conjugated_verb(self, moods, tenses):
        db_response = self.cursor.execute("SELECT * FROM infinitive LEFT JOIN verbs USING (infinitive) WHERE mood IN ('{}') AND tense IN ('{}') ORDER BY random() LIMIT 1".format('\', \''.join(moods), '\', \''.join(tenses))).fetchone()
        response = {
            "verb-spanish": db_response[0],
            "verb-english": db_response[3],
            "infinitive-english": db_response[10],
            "mood": db_response[1],
            "tense": db_response[2],
            "first-person-singular": db_response[4],
            "second-person-singular": db_response[5],
            "third-person-singular": db_response[6],
            "first-person-plural": db_response[7],
            "second-person-plural": db_response[8],
            "third-person-plural": db_response[9]
        }
        return response