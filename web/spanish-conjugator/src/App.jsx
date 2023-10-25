import './App.css'
import Header from './components/Header'
import Options from './components/Options'
import HistoryList from './components/HistoryList'
import ScorePanel from './components/ScorePanel'
import QuestionCard from './components/QuestionCard'

function App() {

  return (
    <>
      <Header />
      <Options />
      <HistoryList />
      <ScorePanel />
      <QuestionCard />
    </>
  )
}

export default App
