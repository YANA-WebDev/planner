import React, { useEffect } from 'react'
import './ItemsList.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";


const ItemsList = ({ tasks, setTasks, setSelectedTaskIndex,setShowTimerModal}) => {
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
  return (
    <div className="items-list">
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
            <div className="timer-container">
              <button
                className="timer-button"
                onClick={() => openTimerModal(index)}
              >
                <FaRegClock className="timer-icon"/> Set Timer
              </button>
              <span className="timer">
                {Math.floor(task.timer / 60)}:{task.timer % 60 < 10 ? "0" : ""}
                {task.timer % 60}
              </span>
            </div>
            <MdDeleteOutline className="delete-button" onClick={() => deleteTask(index)}/>
          </li>
        ))}
      </ol>

    </div>
  )
}

export default ItemsList
