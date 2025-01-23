import React, { useState } from "react";
import { Input } from "antd";
import "./AddTask.css";

const AddTask = ({ setTasks }) => {
  const [newTask, setNewTask] = useState("");
  
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [
        { text: newTask, timer: 0, isRunning: false, done: false },
        ...t,
      ]);
      setNewTask("");
    }
  }

  return (
    <div className="input-container">
      <Input
        className="to-do-input"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
        onPressEnter={addTask}
        style={{ cursor: 'grab' }}
      />
      <button 
        className="add-button" 
        onClick={addTask}
        style={{ cursor: 'grab' }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
