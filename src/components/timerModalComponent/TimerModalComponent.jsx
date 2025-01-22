import React from 'react'
import './TimerModalComponent.css'

const TimerModalComponent = ({showTimerModal,timerMinutes, setTasks, setShowTimerModal, setTimerMinutes, selectedTaskIndex, tasks}) => {
  function setTimerAndStart() {
      if (timerMinutes && selectedTaskIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[selectedTaskIndex].timer = parseInt(timerMinutes) * 60; 
        updatedTasks[selectedTaskIndex].isRunning = true;
        setTasks(updatedTasks);
      }
      setShowTimerModal(false); 
      setTimerMinutes(""); 
  }
  return (
    <div>
      {showTimerModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Set Timer</h3>
            <input
              type="number"
              placeholder="Enter minutes"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={setTimerAndStart}>Start</button>
              <button onClick={() => setShowTimerModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimerModalComponent;
