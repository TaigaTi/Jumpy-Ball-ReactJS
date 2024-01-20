import './App.css'
import Game from './Game';

function App() {
  Game();

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>My Jumper Game</h1>
          <p>A fun flappy-bird like game.</p>
        </div>

        <div id="container">
          <canvas id="canvas" width="600" height="400">
            Your browser does not support the HTML5 canvas tag.
          </canvas>
        </div>
      </div>
    </>
  )
}

export default App
