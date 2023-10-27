import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        flashcardMode: true,
        englishToSpanish: true,
        moods: {
            "Indicativo": true,
            "Subjunctivo": true
        },
        tenses: {
            "Presente": true,
            "Futuro": true,
            "Imperfecto": true,
            "Pereterito": true,
            "Condicional": true,
            "Presente Perfecto": true,
            "Futuro Perfecto": true,
            "Pluscuamperfecto": true,
            "Preterito Anterior": true,
            "Condicional Perfecto": true,
        }
    },
    reducers: {
        toggleFlashcardMode(state, action) {
            state.flashcardMode = action.payload;
        },
        toggleLanguageDirectionality(state, action) {
            state.englishToSpanish = action.payload;
        },
        toggleTense(state, action) {
            state.tenses[action.payload] = !state.tenses[action.payload];
        },
        toggleMood(state, action) {
            state.moods[action.payload] = !state.moods[action.payload];
        }
    }
});

export const { toggleFlashcardMode, toggleLanguageDirectionality, toggleTense, toggleMood } = optionsSlice.actions
export const optionsReducer = optionsSlice.reducer;