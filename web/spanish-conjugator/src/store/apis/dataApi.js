import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dataApi = createApi({
    reducerPath: 'data',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://l4hplxwcb3.execute-api.us-west-1.amazonaws.com/dev',
        credentials: 'same-origin'
    }),
    endpoints(builder) {
        return {
            fetchFlashcard: builder.query({
                query: (commonOnly = false) => {
                    return {
                        url: '/flashcard',
                        method: 'GET',
                        params: { common_only: commonOnly }
                    }
                }
            }),
            fetchConjugation: builder.query({
                query: (requestBody) => {
                    return {
                        url: '/conjugation',
                        method: 'POST',
                        body: requestBody
                    }
                }
            })
        }
    }
});

export const { useFetchFlashcardQuery, useFetchConjugationQuery } = dataApi
export { dataApi }