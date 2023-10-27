import { useSelector } from "react-redux";

function ScorePanel() {

    const { totalQuestions, correctQuestions, streakLength } = useSelector((state) => {
        return state.score
    })

    if (totalQuestions == 0) {
        return (<div>
            Answer questions to track your score!
        </div>)
    } else {
        const proportion = correctQuestions / totalQuestions;
        return (<div>
            <div>{correctQuestions}/{totalQuestions}</div>
            <div>{proportion * 100}% Correct</div>
            <div>{streakLength} Question Streak</div>
        </div>)
    }
}

export default ScorePanel;