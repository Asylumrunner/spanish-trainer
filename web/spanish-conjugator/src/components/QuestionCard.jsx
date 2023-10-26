import { useFetchConjugationQuery } from "../store";

function QuestionCard() {
    const fetchConjugation = useFetchConjugationQuery();
    
    if (fetchConjugation.isFetching) {
        return <div>Fetching conjugation</div>
    } else if (fetchConjugation.error) {
        return <div>Fetching conjugation resulted in error</div>
    } else {
        console.log(fetchConjugation.data)
        return <div>Loaded</div>
    }
}

export default QuestionCard;