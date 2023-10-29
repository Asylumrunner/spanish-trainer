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

    return (
        <div>
            <div>{question}</div>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input disabled={answerSubmitted} value={playerInput} onChange={handleChange} />
                </form>
            </div>
            {answerSubmitted && <button onClick={() => {refreshFunction()}}>Refresh Question</button>}
        </div>
    )
}

export default Question;