import React, {useState} from "react";
import { Input } from "antd";

const AddTask = ({setTasks}) => {
    const [newTask, setNewTask] = useState("");
    
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
  return (
    <div className="input-container">
      <Input
        className="to-do-input"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
      />
      <button className="add-button" onClick={addTask}>
        New
      </button>
    </div>
  );
};

export default AddTask;
