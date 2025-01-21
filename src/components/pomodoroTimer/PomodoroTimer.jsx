import React, { useState } from 'react';
import './pomodoroTimer.css';

const PomodoroTimer = ({ mode, time, bgColor }) => {
    const [secondsLeft, setSecondsLeft] = useState(time * 60);
    const [isRunning, setIsRunning] = useState(false);
  
    const toggleTimer = () => {
      setIsRunning(!isRunning);
    };
  
    React.useEffect(() => {
      if (!isRunning) return;
  
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [isRunning]);
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
  
    return (
      <div className="timer-container" style={{ backgroundColor: bgColor }}>
        <div className="tabs">
          <button className={mode === 'Pomodoro' ? 'active' : ''}>Pomodoro</button>
          <button className={mode === 'Short Break' ? 'active' : ''}>Short Break</button>
          <button className={mode === 'Long Break' ? 'active' : ''}>Long Break</button>
        </div>
        <div className="timer-display">{formatTime(secondsLeft)}</div>
        <button className="start-button" onClick={toggleTimer}>
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <p className="status-text">{mode === 'Pomodoro' ? 'Time to focus!' : 'Time for a break!'}</p>
        <div className="task-section">
          <h3>Tasks</h3>
          <button className="add-task">+ Add Task</button>
        </div>
      </div>
    );
  };
  
  export default PomodoroTimer;