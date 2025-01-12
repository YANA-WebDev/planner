import React, { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./components/addTaskComponent/AddTask";
import ItemsList from "./components/itemsListComponComponents/ItemsList";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState("");

  function setTimerAndStart() {
    if (timerMinutes && selectedTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[selectedTaskIndex].timer = parseInt(timerMinutes) * 60; // Convert minutes to seconds
      updatedTasks[selectedTaskIndex].isRunning = true; // Start timer
      setTasks(updatedTasks);
    }
    setShowTimerModal(false); // Close the modal
    setTimerMinutes(""); // Reset input
  }

  function updateTimers() {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.isRunning && task.timer > 0) {
          return { ...task, timer: task.timer - 1 };
        }
        return task;
      })
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [tasks]);

  return (
    <div className="main-container">
      <h1>MY TO DO:</h1>
      <AddTask setTasks={setTasks}/>
      <ItemsList tasks={tasks} setTasks={setTasks} setSelectedTaskIndex={setSelectedTaskIndex} setShowTimerModal={setShowTimerModal}/>
     
      {/* Timer Modal */}
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
  );
}

export default ToDoList;
