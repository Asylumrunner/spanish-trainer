import Header from './components/Header'
import Options from './components/Options'
import HistoryList from './components/HistoryList'
import ScorePanel from './components/ScorePanel'
import QuestionCard from './components/QuestionCard'

function App() {

  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="basis-1/4">
          <ScorePanel />
          <Options />
        </div>
        <div className="basis-1/2">
        <QuestionCard />
        </div>
        <div className="basis-1/4">
          <HistoryList />
        </div>
      </div>
    </>
  )
}

export default App
