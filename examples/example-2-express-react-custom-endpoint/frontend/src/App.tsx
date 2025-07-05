import './App.css'
import DisplayPlayers from './components/player/DisplayPlayers'
import LoginAsGM from './components/login/LoginAsGM'
import LoginAsPlayer from './components/login/LoginAsPlayer'
import LoginAsStaff from './components/login/LoginAsStaff'

function App() {
  return (
    <>
      <LoginAsStaff />
      <LoginAsGM />
      <LoginAsPlayer />
      <DisplayPlayers />
    </>
  )
}

export default App
