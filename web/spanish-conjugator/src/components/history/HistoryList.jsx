import { useState } from "react";
import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faMinus } from '@fortawesome/free-solid-svg-icons'

function HistoryList() {
    const historyList = useSelector((state) => {
        return state.history.history
    })

    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(3);

    const visibleHistoryCards = historyList.slice(startIdx, endIdx);

    const itemizedHistory = visibleHistoryCards.map((card) => {
        return (<div className="my-1" key={card.id}>
            <HistoryCard data={card} />
        </div>)
    })
    return (
        <div className="hidden lg:flex flex-row">
            <div className="flex flex-col">
                { (historyList.length > 3) && (<button
                    disabled={startIdx === 0}
                    onClick={() => {
                        setStartIdx(startIdx - 1);
                        setEndIdx(endIdx - 1)
                    }}
                    className="border-solid bg-eggplant mb-1 mr-2 basis-1/2"
                ><FontAwesomeIcon icon={(startIdx === 0) ? faMinus : faChevronUp} /></button>)}
                { (historyList.length > 3) && (<button
                disabled={endIdx >= Object.values(historyList).length}
                onClick={() => {
                    setStartIdx(startIdx + 1);
                    setEndIdx(endIdx + 1)
                }}
                className="border-solid bg-eggplant mt-1 mr-2 basis-1/2"
                ><FontAwesomeIcon icon={(endIdx >= Object.values(historyList).length) ? faMinus : faChevronDown} /></button>)}
            </div>
            <div className="grow basis-full mr-2">{itemizedHistory}</div>
        </div>
    )
}

export default HistoryList;