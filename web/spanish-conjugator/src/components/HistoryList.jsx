import { useSelector } from "react-redux";

function HistoryList() {
    const historyList = useSelector((state) => {
        return state.history.history
    })

    const itemizedHistory = historyList.map((card) => {
        return (<div key={card.id}>
            <div>{card.question}</div>
        </div>)
    })
    return <div>{itemizedHistory}</div>
}

export default HistoryList;