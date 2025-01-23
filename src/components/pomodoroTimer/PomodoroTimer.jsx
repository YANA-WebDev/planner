import { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [cycleCount, setCycleCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButton, setModalButton] = useState('');

  const playTickSound = () => {
    new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
  };

  const handleCycleCompletion = () => {
    if (mode === 'work') {
      if (cycleCount === 2) {
        setModalMessage('Час зробити довгу паузу і розслабитись');
        setModalButton('Почати довгу паузу');
        setMode('longBreak');
      } else {
        setModalMessage('Час зробити паузу ☕️');
        setModalButton('Почати паузу');
        setMode('shortBreak');
      }
    } else if (mode === 'shortBreak') {
      setModalMessage('Час продовжити роботу');
      setModalButton('Продовжити роботу');
      setMode('work');
      setCycleCount(prev => prev + 1);
    } else if (mode === 'longBreak') {
      setModalMessage('Час зосередитись і продовжити роботу');
      setModalButton('Почати роботу');
      setMode('work');
      setCycleCount(0);
    }
    setShowModal(true);
    setIsActive(false);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleCycleCompletion();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          if (minutes === 0 && seconds <= 5) {
            playTickSound();
          }
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startNextPhase = () => {
    setShowModal(false);
    if (mode === 'work') {
      setMinutes(25);
    } else if (mode === 'shortBreak') {
      setMinutes(5);
    } else if (mode === 'longBreak') {
      setMinutes(20);
    }
    setSeconds(0);
    setIsActive(true);
  };

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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={startNextPhase}>{modalButton}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;