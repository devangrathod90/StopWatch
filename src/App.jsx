import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const handle = function (e, feild) {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[feild] = value;

    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;

    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;

    setTime(copyTime);
  };

  function handleStart() {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      return;
    }
    setIsRunning((prev) => !prev);
  };

  function handleReset(){
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({
      hour:"" ,
      minute:"",
      second:""
    })
      
    
  }

  useEffect(() => {
    if(isRunning){
      intervalRef.current = setInterval(() => 
        {
          setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.second--;
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--;
              copyPrevTime.minute = 59;
            }
            if (copyPrevTime.hour < 0) {
              clearInterval(intervalRef.current);
              return { hour: "", minute: "", second: "" };
            }
          }
          return copyPrevTime;
        });
      }, 1000);
    }
    return ()=>{
      clearInterval(intervalRef.current)
    }
  }, [isRunning]);

  
  return (
    <div>
        <h1 className="heading">StopWatch</h1>
      <div>
        <input
          disabled={isRunning}
          value={time.hour}
          className="input-area"
          type="text"
          placeholder="HH"
          onChange={(e) => handle(e, "hour")}
        />
        :
        <input
          disabled={isRunning}
          className="input-area"
          type="text"
          placeholder="MM"
          onChange={(e) => handle(e, "minute")}
          value={time.minute}
        />
        :
        <input
          disabled={isRunning}
          className="input-area"
          type="text"
          placeholder="SS"
          onChange={(e) => handle(e, "second")}
          value={time.second}
        />
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleStart}>
          {isRunning ? "pause" : "start"}
        </button>
        <button className="btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
