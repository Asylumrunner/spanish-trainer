import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const dataApi = createApi({
    reducerPath: 'data',
    baseQuery: fetchBaseQuery({
        baseUrl: 'some-long-ass-aws-shit',
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
                query: () => {
                    return {
                        url: '/conjugation',
                        method: 'GET'
                    }
                }
            })
        }
    }
});

export const { useFetchFlashcardQuery, useFetchConjugationQuery } = dataApi
export { dataApi }