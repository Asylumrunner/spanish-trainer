import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function HistoryCard({data}) {

    const icon = (data.isCorrect) ?
        (<FontAwesomeIcon icon={faCircleCheck} size="2x" />) :
        (<FontAwesomeIcon icon={faCircleXmark} size="2x" />)

    return (<div className="border-4 border-cool rounded-md bg-english shadow-lg flex flex-row p-2">
        <div className="flex basis-1/5 items-center justify-center mr-3">{icon}</div>
        <div className="flex flex-col basis-4/5">
            <div>{data.question}</div>
            <div>{data.correctAnswer}</div>
        </div>
    </div>)
}

export default HistoryCard;