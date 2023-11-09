import { useState } from "react";
import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons'

function HistoryList() {
    const historyList = useSelector((state) => {
        return state.history.history
    })

    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(3);

    const visibleHistoryCards = historyList.slice(startIdx, endIdx);

    const itemizedHistory = visibleHistoryCards.map((card) => {
        return (<div key={card.id}>
            <HistoryCard data={card} />
        </div>)
    })
    return (
        <div>
            <button
                disabled={startIdx === 0}
                onClick={() => {
                    setStartIdx(startIdx - 1);
                    setEndIdx(endIdx - 1)
                }}
                className="border-solid bg-eggplant mb-3"
            ><FontAwesomeIcon icon={(startIdx === 0) ? faXmark : faChevronUp} /></button>
            <div>{itemizedHistory}</div>
            <button
                disabled={endIdx >= Object.values(historyList).length}
                onClick={() => {
                    setStartIdx(startIdx + 1);
                    setEndIdx(endIdx + 1)
                }}
                className="border-solid bg-eggplant mt-3"
            ><FontAwesomeIcon icon={(endIdx >= Object.values(historyList).length) ? faXmark : faChevronDown} /></button>
        </div>
    )
}

export default HistoryList;