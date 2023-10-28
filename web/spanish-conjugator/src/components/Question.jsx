import { markCorrectAnswer, markIncorrectAnswer, addQuestionToHistory } from "../store";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Question({data, refreshFunction}) {
    const dispatch = useDispatch();
    const [playerInput, setPlayerInput] = useState("");
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const { englishToSpanish } = useSelector((state) => {
        return state.options;
    });

    const question = englishToSpanish ? data["verb-english"] : data["verb-spanish"]
    const answer = englishToSpanish ? data["verb-spanish"] : data["verb-english"]

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let gotItRight = false;
        console.log(playerInput);
        console.log(answer);
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
            isConjugation: false,
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