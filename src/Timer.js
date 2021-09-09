import React from 'react';
import { useTimer } from 'react-timer-hook';

function Timer({ expiryTimestamp, timeLimit}) {


  const {
    seconds,
    minutes,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div style={{textAlign: 'center'}}>
        
        <span>{minutes}</span>:<span>{seconds<10 ? "0"+seconds : seconds}</span>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 310);
        restart(time, false)
      }}>Restart</button>
    </div>
  );
}


export default Timer