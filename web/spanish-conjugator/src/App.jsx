import Header from './components/Header'
import Options from './components/Options'
import HistoryList from './components/HistoryList'
import ScorePanel from './components/ScorePanel'
import QuestionCard from './components/QuestionCard'
import { useSelector } from "react-redux";

function App() {
  const historyListSize = useSelector((state) => {
    return state.history.history.length
  })

  return (
    <>
      <Header className="mx-8"/>
      <div className="flex flex-row w-screen">
        <div className="basis-1/4 mx-8 min-w-max">
          <ScorePanel />
          <Options />
        </div>
        <div className="grow">
        <QuestionCard />
        </div>
        <div className="basis-1/4 mx-8">
          { historyListSize > 0 && <HistoryList />}
        </div>
      </div>
    </>
  )
}

export default App
