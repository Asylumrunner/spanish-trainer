import Question from "./Question"
import { useFetchConjugationQuery } from "../../store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function QuestionCard() {
    const { moods, tenses } = useSelector((state) => {
        return state.options;
    })

    const simplifiedMoods = Object.keys(moods).filter(mood => moods[mood]);
    const simplifiedTenses = Object.keys(tenses).filter(tense => tenses[tense]);

    const requestBody = {
        moods: simplifiedMoods,
        tenses: simplifiedTenses
    }

    const question = useFetchConjugationQuery(requestBody);

    if (question.isFetching) {
        return <div className="mx-4 mb-4 border-4 border-cool rounded-md bg-english h-60 shadow-lg p-4 lg:p-8 flex flex-col justify-items-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        </div>
    } else if ( question.error) {
        return <div className="mx-4 mb-4 border-4 border-cool rounded-md bg-english h-60 shadow-lg p-4 lg:p-8 flex flex-col justify-items-center">
            There was an error in retrieving the next question, perdónanos!
        </div>
    } else {
        console.log(question.data)
        return <Question data={question.data} refreshFunction={question.refetch}></Question>
    }

}

export default QuestionCard;