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
                query: () => {
                    return {
                        url: '/flashcard',
                        method: 'GET'
                    }
                }
            }),
            fetchConjugation: builder.query({
                query: (moods, tenses) => {
                    console.log("AAAAAAAAA")
                    console.log(moods)
                    console.log(tenses)
                    return {
                        url: '/conjugation',
                        method: 'POST',
                        body: {
                            moods: moods,
                            tenses: tenses
                        }
                    }
                }
            })
        }
    }
});

export const { useFetchFlashcardQuery, useFetchConjugationQuery } = dataApi
export { dataApi }