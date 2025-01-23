import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import "./NavigationMenu.css";

const NavigationMenu = () => {
  const [isMusicMenuOpen, setIsMusicMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [theme, setTheme] = useState("white");

  const sounds = [
    { name: "Rain", url: "https://example.com/rain.mp3" },
    { name: "Forest", url: "https://example.com/forest.mp3" },
    { name: "Waves", url: "https://example.com/waves.mp3" },
    { name: "Fireplace", url: "https://example.com/fireplace.mp3" },
  ];

  const toggleMusicMenu = () => {
    setIsMusicMenuOpen(!isMusicMenuOpen);
    setIsSettingsMenuOpen(false);
  };

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
    setIsMusicMenuOpen(false);
  };

  const playSound = (soundUrl) => {
    if (currentSound) {
      currentSound.pause();
    }
    const audio = new Audio(soundUrl);
    audio.loop = true;
    audio.play();
    setCurrentSound(audio);
  };

  const stopSound = () => {
    if (currentSound) {
      currentSound.pause();
      setCurrentSound(null);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = ""; // Reset current theme
    document.body.classList.add(newTheme); // Apply new theme
  };

  return (
    <div className="navigation-menu">
      <IoMusicalNotesOutline
        className="navigation-icon"
        onClick={toggleMusicMenu}
      />
      <CgNotes className="navigation-icon" />

      <IoSettingsOutline
        className="navigation-icon"
        onClick={toggleSettingsMenu}
      />

      {isMusicMenuOpen && (
        <div className="music-menu">
          <h3>Choose a Sound</h3>
          {sounds.map((sound) => (
            <button
              key={sound.name}
              className="music-button"
              onClick={() => playSound(sound.url)}
            >
              {sound.name}
            </button>
          ))}
          <button className="music-button stop-button" onClick={stopSound}>
            Stop Music
          </button>
        </div>
      )}

      {isSettingsMenuOpen && (
        <div className="settings-menu">
          <h3>Settings</h3>
          <div className="setting-item">
            <label htmlFor="pomodoro-time">Pomodoro Time (min):</label>
            <input
              type="number"
              id="pomodoro-time"
              value={pomodoroTime}
              onChange={(e) => setPomodoroTime(e.target.value)}
              min="1"
              max="60"
            />
          </div>
          <div className="setting-item">
            <label htmlFor="short-break-time">Short Break Time (min):</label>
            <input
              type="number"
              id="short-break-time"
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(e.target.value)}
              min="1"
              max="30"
            />
          </div>
          <div className="setting-item">
            <label htmlFor="long-break-time">Long Break Time (min):</label>
            <input
              type="number"
              id="long-break-time"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(e.target.value)}
              min="1"
              max="60"
            />
          </div>

          <div className="setting-item">
            <label>Theme:</label>
            <div className="theme-options">
            <button
                className="original-theme"
                onClick={() => changeTheme("original")}
              >
                Colorful
              </button>
              <button
                className="theme-button colorful"
                onClick={() => changeTheme("colorful")}
              >
                Colorful
              </button>
              <button
                className="theme-button warm-dark"
                onClick={() => changeTheme("warm-dark")}
              >
                Warm Dark
              </button>
              <button
                className="theme-button black-purple"
                onClick={() => changeTheme("black-purple")}
              >
                Black and Purple
              </button>
              <button
                className="theme-button green"
                onClick={() => changeTheme("green")}
              >
                Green
              </button>
              <button
                className="theme-button blue"
                onClick={() => changeTheme("blue")}
              >
                Blue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
