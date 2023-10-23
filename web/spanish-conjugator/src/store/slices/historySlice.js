import { createSlice, nanoid } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initalState: {
        history: []
    },
    reducers: {
        addQuestionToHistory(state, action) {
            state.history.push({
                id: nanoid(),
                question: action.payload.question,
                isConjugation: action.payload.isConjugation,
                isCorrect: action.payload.isCorrect
            });
        }
    }
});

export const { addQuestionToHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;