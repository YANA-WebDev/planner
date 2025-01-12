import React, { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./components/addTaskComponent/AddTask";
import ItemsList from "./components/itemsListComponComponents/ItemsList";
import TimerModalComponent from "./components/timerModalComponent/TimerModalComponent";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState("");

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
      <TimerModalComponent showTimerModal={showTimerModal} timerMinutes={timerMinutes} setTasks={setTasks} setShowTimerModal={setShowTimerModal} setTimerMinutes={setTimerMinutes} selectedTaskIndex={selectedTaskIndex} tasks={tasks}/>
    </div>
  );
}

export default ToDoList;
