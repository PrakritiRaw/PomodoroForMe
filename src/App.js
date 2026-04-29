import { useState, useEffect } from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import useTing from './hooks/useTing'; // 👈 import the hook

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('focus');
  const [sessions, setSessions] = useState(0);

  const { playTing } = useTing(); // 👈 get the playTing function

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      playTing(); // 👈 play sound when timer hits zero!
      if (phase === 'focus') {
        setSessions(prev => prev + 1);
        setPhase('break');
        setTimeLeft(BREAK_DURATION);
      } else {
        setPhase('focus');
        setTimeLeft(FOCUS_DURATION);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, phase]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setPhase('focus');
    setTimeLeft(FOCUS_DURATION);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return (
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0')
    );
  };

  return (
    <PomodoroTimer
      timeDisplay={formatTime(timeLeft)}
      timeLeft={timeLeft}
      phase={phase}
      isRunning={isRunning}
      sessions={sessions}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
    />
  );
}

export default App;