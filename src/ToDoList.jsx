import React, { useState, useEffect } from "react";
import "./App.css";
import AddTask from "./components/addTaskComponent/AddTask";
import ItemsList from "./components/itemsListComponComponents/ItemsList";
import TimerModalComponent from "./components/timerModalComponent/TimerModalComponent";
import NavigationMenu from "./components/navigation menu/NavigationMenu";

  
function ToDoList() {
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState("");
 
  

  function updateTimers() {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.isRunning && task.timer > 1) {
          return { ...task, timer: task.timer - 1 };
        }
        if (task.isRunning && task.timer == 1) {
          alert("Time's up! For task: " + task.text);
          return { ...task, timer: task.timer - 1, isRunning: false };
        }
        return task;
      })
    );
    setTasks((currentTasks) => {
      localStorage.setItem("tasks", JSON.stringify(currentTasks));
      return currentTasks;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <img src="./images/logo.png" alt="logo" className="main-logo" />
      <AddTask setTasks={setTasks} />
      <ItemsList tasks={tasks} setTasks={setTasks} setSelectedTaskIndex={setSelectedTaskIndex} setShowTimerModal={setShowTimerModal} />
      <NavigationMenu />
      <TimerModalComponent showTimerModal={showTimerModal} timerMinutes={timerMinutes} setTasks={setTasks} setShowTimerModal={setShowTimerModal} setTimerMinutes={setTimerMinutes} selectedTaskIndex={selectedTaskIndex} tasks={tasks}  
      />
    </div>
  );
}

export default ToDoList;
