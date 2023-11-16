import Header from './components/Header'
import OptionsToggle from './components/options/OptionsToggle'
import HistoryList from './components/history/HistoryList'
import ScorePanel from './components/ScorePanel'
import QuestionCard from './components/question/QuestionCard'
import Footer from './components/Footer'
import { useSelector } from "react-redux";

function App() {
  const historyListSize = useSelector((state) => {
    return state.history.history.length
  })

  return (
    <>
      <Header className="mx-8"/>
      <div className="flex flex-col lg:flex-row w-screen">
        <div className="flex flex-row lg:flex-col basis-1/4 mx-8 min-w-max">
          <div className="basis-4/5 lg:basis-1/5"><ScorePanel /></div>
          <div className="basis-1/5 lg:basis-4/5"><OptionsToggle /></div>
        </div>
        <div className="grow">
          <QuestionCard />
        </div>
        <div className="basis-1/4 mx-8">
          { historyListSize > 0 && <HistoryList />}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
