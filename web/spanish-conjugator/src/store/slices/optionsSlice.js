import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        flashcardMode: true,
        englishToSpanish: true,
        commonVerbsOnly: false,
        moods: {
            "Indicative": true,
            "Subjunctive": true
        },
        tenses: {
            "Present": true,
            "Perfect": true,
            "Imperfect": true,
            "Preterite": true,
            "Conditional": true,
            "Present Perfect": true,
            "Future Perfect": true,
            "Past Perfect": true,
            "Preterite (Archaic)": true,
            "Conditional Perfect": true,
        }
    },
    reducers: {
        toggleFlashcardMode(state, action) {
            state.flashcardMode = action.payload;
        },
        toggleLanguageDirectionality(state, action) {
            state.englishToSpanish = action.payload;
        },
        toggleCommonVerbsOnly(state) {
            state.commonVerbsOnly = !state.commonVerbsOnly;
        },
        toggleTense(state, action) {
            state.tenses[action.payload] = !state.tenses[action.payload];
        },
        toggleMood(state, action) {
            state.moods[action.payload] = !state.moods[action.payload];
        }
    }
});

export const { toggleFlashcardMode, toggleLanguageDirectionality, toggleTense, toggleMood, toggleCommonVerbsOnly } = optionsSlice.actions
export const optionsReducer = optionsSlice.reducer;