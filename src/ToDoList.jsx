import React, { useState, useEffect } from "react";
import "./App.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [
        ...t,
        { text: newTask, timer: 0, isRunning: false, done: false },
      ]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done; // Toggle the "done" state
    setTasks(updatedTasks);
  }

  function openTimerModal(index) {
    setSelectedTaskIndex(index);
    setShowTimerModal(true);
  }

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
    <div className="pö.">
      <h1>MY TO DO:</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          New
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(index)}
            />
            <span className={task.done ? "text task-done" : "text"}>
              {task.text}
            </span>
            <div>
              <button
                className="timer-button"
                onClick={() => openTimerModal(index)}
              >
                ⏱ Set Timer
              </button>
              <span className="timer">
                {Math.floor(task.timer / 60)}:{task.timer % 60 < 10 ? "0" : ""}
                {task.timer % 60}
              </span>
            </div>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ol>

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