import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard"

function HistoryList() {
    const historyList = useSelector((state) => {
        return state.history.history
    })

    const itemizedHistory = historyList.map((card) => {
        return (<div key={card.id}>
            <HistoryCard data={card} />
        </div>)
    })
    return <div>{itemizedHistory}</div>
}

export default HistoryList;