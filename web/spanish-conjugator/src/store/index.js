import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { historyReducer, addQuestionToHistory } from './slices/historySlice'
import { dataApi } from './apis/dataApi';

export const store = configureStore({
    reducer: {
        history: historyReducer,
        [dataApi.reducerPath]: dataApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(dataApi.middleware)
    }
});

setupListeners(store.dispatch);

export { addQuestionToHistory }
export { useFetchFlashcardQuery, useFetchConjugationQuery } from './apis/dataApi'