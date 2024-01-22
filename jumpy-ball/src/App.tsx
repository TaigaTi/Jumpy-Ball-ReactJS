import './App.css'
import Game from './Game'

function App() {
  return (
    <>
      <div className="App">
        <div className="header">
          <h1>My Jumper Game</h1>
          <p>A fun flappy-bird like game.</p>
        </div>
        <Game />
      </div>
    </>
  )
}

export default App
