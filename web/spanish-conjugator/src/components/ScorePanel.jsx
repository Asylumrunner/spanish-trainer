import { useSelector } from "react-redux";

function ScorePanel() {

    const { totalQuestions, correctQuestions, streakLength } = useSelector((state) => {
        return state.score
    })

    if (totalQuestions == 0) {
        return (<div className="bg-marian rounded-md shadow-lg mb-8 p-2">
            Answer questions to track your score!
        </div>)
    } else {
        const proportion = correctQuestions / totalQuestions;
        return (<div className="bg-marian rounded-md shadow-lg mb-8 p-2">
            <div>{correctQuestions}/{totalQuestions}</div>
            <div>{Math.ceil(proportion * 100)}% Correct</div>
            <div>{streakLength} Question Streak</div>
        </div>)
    }
}

export default ScorePanel;