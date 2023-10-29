import Question from "./Question"
import { useFetchConjugationQuery } from "../store";

function QuestionCard() {
    const question = useFetchConjugationQuery();

    if (question.isFetching) {
        return <div>Fetching first question</div>
    } else if ( question.error) {
        return <div>Error in fetching question</div>
    } else {
        console.log(question.data)
        return <Question data={question.data} refreshFunction={question.refetch}></Question>
    }

}

export default QuestionCard;