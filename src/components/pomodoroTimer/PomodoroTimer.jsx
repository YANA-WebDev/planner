import { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            // Play notification sound
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setMinutes(25);
    if (mode === 'shortBreak') setMinutes(5);
    if (mode === 'longBreak') setMinutes(20);
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'work') setMinutes(25);
    if (newMode === 'shortBreak') setMinutes(5);
    if (newMode === 'longBreak') setMinutes(15);
    setSeconds(0);
  };

  return (
    <div className="pomodoro-container">
      <div className="mode-switcher">
        <button 
          className={mode === 'work' ? 'active' : ''} 
          onClick={() => switchMode('work')}
        >
          Work
        </button>
        <button 
          className={mode === 'shortBreak' ? 'active' : ''} 
          onClick={() => switchMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={mode === 'longBreak' ? 'active' : ''} 
          onClick={() => switchMode('longBreak')}
        >
          Long Break
        </button>
      </div>
      
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="controls">
        <button className="control-button" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="control-button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;