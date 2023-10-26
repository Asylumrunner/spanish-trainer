import { useFetchConjugationQuery, useFetchFlashcardQuery } from "../store";

function QuestionCard() {
    const fetchConjugation = useFetchConjugationQuery();
    const fetchFlashcard = useFetchFlashcardQuery();
    
    if (fetchFlashcard.isFetching) {
        return <div>Fetching conjugation</div>
    } else if (fetchFlashcard.error) {
        return <div>Fetching conjugation resulted in error</div>
    } else {
        console.log(fetchFlashcard.data)
        return <div>{fetchFlashcard.data["verb-spanish"]}</div>
    }
}

export default QuestionCard;