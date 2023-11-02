import Question from "./Question"
import { useFetchConjugationQuery } from "../store";
import { useSelector } from "react-redux";

function QuestionCard() {
    const { moods, tenses } = useSelector((state) => {
        return state.options;
    })

    const simplifiedMoods = Object.keys(moods).filter(mood => moods[mood]);
    const simplifiedTenses = Object.keys(tenses).filter(tense => tenses[tense]);

    console.log(simplifiedMoods)
    console.log(simplifiedTenses)

    const question = useFetchConjugationQuery(simplifiedMoods, simplifiedTenses);

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