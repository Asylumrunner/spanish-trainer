import { markCorrectAnswer, markIncorrectAnswer, addQuestionToHistory } from "../store";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function Question({data, refreshFunction}) {
    const dispatch = useDispatch();
    const [playerInput, setPlayerInput] = useState("");
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const { englishToSpanish, flashcardMode } = useSelector((state) => {
        return state.options;
    });

    const conjugationOptions = [
        {
            "key": "form_1p",
            "subject": "First Person Plural"
        },
        {
            "key": "form_1s",
            "subject": "First Person Singular"
        },
        {
            "key": "form_2p",
            "subject": "Second Person Plural"
        },
        {
            "key": "form_2s",
            "subject": "Second Person Singular"
        },
        {
            "key": "form_3p",
            "subject": "Third Person Plural"
        },
        {
            "key": "form_3s",
            "subject": "Third Person Singular"
        }
    ]

    const [randomConjugation, setRandomConjugation] = useState(conjugationOptions[Math.floor(Math.random() * conjugationOptions.length)]);

    const checkAnswer = (correctAnswer, providedAnswer) => {
        const trimmedProvidedAnswer = providedAnswer.replace("to", "").trim()
        const trimmedCorrectAnswer = correctAnswer.replace("to", "").trim()

        if (trimmedProvidedAnswer === "") {
            return false;
        } else if (trimmedCorrectAnswer.includes(trimmedProvidedAnswer)) {
            console.log("u did it")
            return true;
        } else {
            return false;
        }
    }

    let question, answer = "placeholder";
    if (flashcardMode) {
        question = englishToSpanish ? data["infinitive_english"] : data["infinitive"]
        answer = englishToSpanish ? data["infinitive"] : data["infinitive_english"]
    } else {
        question = (<div>{data["infinitive_english"]} <br />{data.mood_english} {data.tense_english} {randomConjugation.subject}</div>)
        answer = data[randomConjugation["key"]]
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let gotItRight = checkAnswer(answer, playerInput);
        if (gotItRight) {
            dispatch(markCorrectAnswer()) 
        } else {
            dispatch(markIncorrectAnswer())
        }
        dispatch(addQuestionToHistory({
            question: question,
            answerGiven: playerInput,
            correctAnswer: answer,
            isConjugation: !flashcardMode,
            isCorrect: gotItRight
        }))
        setAnswerSubmitted(true);
    }

    const handleChange = (event) => {
        setPlayerInput(event.target.value);
    }

    const button = answerSubmitted ? 
        (<button className="border-solid bg-eggplant m-auto mt-3 flex align-center" onClick={() => {refreshFunction()}}>Next Question</button>) :
        (<button className="rounded-full border-solid bg-eggplant m-auto mt-3 flex align-center" form="submission" type="submit">Submit Answer</button>)

    const icon = (checkAnswer(answer, playerInput)) ?
        (<FontAwesomeIcon icon={faCircleCheck}/>) :
        (<FontAwesomeIcon icon={faCircleXmark}/>)

    return (
        <div className="mx-4 mb-4 border-4 border-cool rounded-md bg-english h-60 shadow-lg p-8 flex flex-col justify-items-center">
            <div className="text-center text-2xl">{question}</div>
            {answerSubmitted && (<div className="text-center text-xl">{icon} {answer}</div>)}
            <div className="justify-items-center">
                <form className="text-black" id="submission" onSubmit={handleFormSubmit}>
                    <input className="block bg-uranian text-black m-auto mt-4" disabled={answerSubmitted} value={playerInput} onChange={handleChange} />
                </form>
                {button}
            </div>
        </div>
    )
}

export default Question;