import { createSlice, nanoid } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: []
    },
    reducers: {
        addQuestionToHistory(state, action) {
            state.history.unshift({
                id: nanoid(),
                question: action.payload.question,
                answerGiven: action.payload.answerGiven,
                correctAnswer: action.payload.correctAnswer,
                isConjugation: action.payload.isConjugation,
                isCorrect: action.payload.isCorrect
            });
        }
    }
});

export const { addQuestionToHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;