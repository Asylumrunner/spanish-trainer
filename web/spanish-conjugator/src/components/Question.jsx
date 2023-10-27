import { markCorrectAnswer, markIncorrectAnswer, addQuestionToHistory } from "../store";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Question({data, refreshFunction}) {
    const dispatch = useDispatch();
    const [playerInput, setPlayerInput] = useState("");
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(markCorrectAnswer())
        dispatch(addQuestionToHistory({
            question: data["verb-spanish"],
            isConjugation: false,
            isCorrect: true
        }))
        setAnswerSubmitted(true);
    }

    const handleChange = (event) => {
        setPlayerInput(event.target.value);
    }

    return (
        <div>
            <div>{data["verb-spanish"]}</div>
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