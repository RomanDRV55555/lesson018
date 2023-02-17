import './App.css';
import Timer from './Components/Timer.js'
import InfiniteTimer from './Components/InfiniteTimer';

function App() {
  return (
    <div>
      <h5>Standart timer</h5>
      <Timer time={10000} step={1000}
        onTick={(time) => console.log("Залишилось часу: " + time)}
        onTimeEnd={() => {
            console.log("Час вийшов!")
          }
        }
        onTimeStart={(timeLeft) =>
          console.log("Таймер запущено!")
        }
        onTimePause={(timeLeft) =>
          console.log("Таймер на паузі!")
        }
      ></Timer>
      <h5>Short infinity (not from task)</h5>
      <Timer time={10000} step={2000} autostart={true} ></Timer>
      <h5>InfiniteTimer</h5>
      <InfiniteTimer></InfiniteTimer>    
    </div>

  );
}

export default App;
