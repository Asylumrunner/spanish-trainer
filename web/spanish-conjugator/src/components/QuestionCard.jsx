import Question from "./Question"
import { useFetchFlashcardQuery } from "../store";

function QuestionCard() {
    const question = useFetchFlashcardQuery();

    if (question.isFetching) {
        return <div>Fetching first question</div>
    } else if ( question.error) {
        return <div>Error in fetching question</div>
    } else {
        return <Question data={question.data} refreshFunction={question.refetch}></Question>
    }

}

export default QuestionCard;