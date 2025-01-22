
import ToDoList from './ToDoList.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import PomodoroTimer from './components/pomodoroTimer/PomodoroTimer.jsx';
import TimerModalComponent from './components/timerModalComponent/TimerModalComponent.jsx';
import './App.css';

function App() {
  return (
 <>
  <SignUp/>
  <PomodoroTimer mode="Pomodoro" time={1} bgColor="#FF6B6B"/>
  <PomodoroTimer mode="Short Break" time={1} bgColor="#FF6B6B"/>
  <PomodoroTimer mode="Long Break" time={1} bgColor="#FF6B6B"/>
  <TimerModalComponent/>
  <ToDoList/>
 </>
)
  
}

export default App;