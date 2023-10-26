import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { historyReducer, addQuestionToHistory } from './slices/historySlice'
import { scoreReducer, markCorrectAnswer, markIncorrectAnswer } from './slices/scoreSlice';
import { optionsReducer, toggleFlashcardMode, toggleLanguageDirectionality, toggleMood, toggleTense } from './slices/optionsSlice';
import { dataApi } from './apis/dataApi';

export const store = configureStore({
    reducer: {
        history: historyReducer,
        score: scoreReducer,
        options: optionsReducer,
        [dataApi.reducerPath]: dataApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(dataApi.middleware)
    }
});

setupListeners(store.dispatch);

export { addQuestionToHistory, markCorrectAnswer, markIncorrectAnswer, toggleFlashcardMode, toggleLanguageDirectionality, toggleMood, toggleTense }
export { useFetchFlashcardQuery, useFetchConjugationQuery } from './apis/dataApi'