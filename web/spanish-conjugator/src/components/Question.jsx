import { markCorrectAnswer, markIncorrectAnswer, addQuestionToHistory } from "../store";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Question({data, refreshFunction}) {
    const dispatch = useDispatch();
    const [playerInput, setPlayerInput] = useState("");
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const { englishToSpanish, flashcardMode } = useSelector((state) => {
        return state.options;
    });

    const conjugationOptions = [
        {
            "key": "first-person-plural",
            "subject": "First Person Plural"
        },
        {
            "key": "first-person-singular",
            "subject": "First Person Singular"
        },
        {
            "key": "second-person-plural",
            "subject": "Second Person Plural"
        },
        {
            "key": "second-person-singular",
            "subject": "Second Person Singular"
        },
        {
            "key": "third-person-plural",
            "subject": "Third Person Plural"
        },
        {
            "key": "third-person-singular",
            "subject": "Third Person Singular"
        }
    ]

    const [randomConjugation, setRandomConjugation] = useState(conjugationOptions[Math.floor(Math.random() * conjugationOptions.length)]);

    let question, answer = "placeholder";
    if (flashcardMode) {
        question = englishToSpanish ? data["infinitive-english"] : data["verb-spanish"]
        answer = englishToSpanish ? data["verb-spanish"] : data["infinitive-english"]
    } else {
        question = (<div>{data["infinitive-english"]} <br />{data.mood} {data.tense} {randomConjugation.subject}</div>)
        answer = data[randomConjugation["key"]]
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let gotItRight = false;
        if (playerInput == answer) {
            dispatch(markCorrectAnswer()) 
            gotItRight = true;
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

    return (
        <div className="border-4 border-cool rounded-md bg-english h-60 shadow-lg p-8 flex flex-col justify-items-center">
            <div className="text-center text-2xl">{question}</div>
            {answerSubmitted && (<div className="text-center text-xl">{answer}</div>)}
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