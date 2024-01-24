import './App.css'
import Canvas from './Canvas'

function App() {

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>My Jumper Game</h1>
          <p>A fun flappy-bird like game.</p>
        </div>
        <div className="container">
          <Canvas height={400} width={600} />
        </div>
      </div>
    </>
  )
}

export default App
