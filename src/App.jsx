
import ToDoList from './ToDoList.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import PomodoroTimer from './components/pomodoroTimer/PomodoroTimer.jsx';
import TimerModalComponent from './components/timerModalComponent/TimerModalComponent.jsx';
import './App.css';

function App() {
  return (
 <>
  <img src="./public/images/logo.png" alt="logo" className="main-logo" />
  <SignUp/>
  <PomodoroTimer mode="Pomodoro" time={1} />
  <TimerModalComponent/>
  <ToDoList/>
  
 </>
)
  
}

export default App;