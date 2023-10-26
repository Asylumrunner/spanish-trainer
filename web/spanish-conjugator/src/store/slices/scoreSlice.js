import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        totalQuestions: 0,
        correctQuestions: 0,
        streakLength: 0
    },
    reducers: {
        markCorrectAnswer(state, _action) {
            state.totalQuestions += 1;
            state.correctQuestions += 1;
            state.streakLength += 1;
        },
        markIncorrectAnswer(state, _action) {
            state.totalQuestions += 1;
            state.streakLength = 0;
        }
    }
});

export const { markCorrectAnswer, markIncorrectAnswer } = scoreSlice.actions;
export const scoreReducer = scoreSlice.reducer;