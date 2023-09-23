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
    def get_verb(self, language):
        db_response = self.cursor.execute("SELECT * FROM infinitive ORDER BY random() LIMIT 1").fetchone()
        response = {
            "verb-untranslated": db_response[0] if language == "ESP" else db_response[1],
            "verb-translated": db_response[1] if language == "ESP" else db_response[0],
            "infinitive": db_response[0]
        }
        return response
    
    # Returns a conjugated verb. For conjugation mode
    def get_conjugated_verb(self, language, tenses, region, subject=[True, True, True, True, True, True]):
        return "bah bah bah"