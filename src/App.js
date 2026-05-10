import { useState, useEffect, useRef } from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import useTing from './hooks/useTing';

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('focus');
  const [sessions, setSessions] = useState(0);

  const { playTing } = useTing();

  // useRef to store values that shouldn't trigger re-renders
  const startTimeRef = useRef(null);      // when did the current session start?
  const remainingRef = useRef(FOCUS_DURATION); // how much time was left when we (re)started?
  const phaseRef = useRef('focus');       // current phase (ref so useEffect always sees latest)

  useEffect(() => {
    // Keep phaseRef in sync with phase state
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!isRunning) return;

    // Record the real-world time when we start/resume
    startTimeRef.current = Date.now();

    const timer = setInterval(() => {
      // How many seconds have passed in the real world?
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

      // Remaining = whatever was left when we started - real elapsed time
      const newTimeLeft = remainingRef.current - elapsed;

      if (newTimeLeft <= 0) {
        // Timer finished!
        clearInterval(timer);
        playTing();

        if (phaseRef.current === 'focus') {
          setSessions(prev => prev + 1);
          setPhase('break');
          setTimeLeft(BREAK_DURATION);
          remainingRef.current = BREAK_DURATION;
        } else {
          setPhase('focus');
          setTimeLeft(FOCUS_DURATION);
          remainingRef.current = FOCUS_DURATION;
        }

        // Restart the clock for the new phase
        startTimeRef.current = Date.now();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);  // only re-run when isRunning changes

  const handleStart = () => {
    // Save how much time is left right now before starting
    remainingRef.current = timeLeft;
    setIsRunning(true);
  };

  const handlePause = () => {
    // Save exactly how much time is left at the moment of pause
    remainingRef.current = timeLeft;
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('focus');
    setTimeLeft(FOCUS_DURATION);
    remainingRef.current = FOCUS_DURATION;
    startTimeRef.current = null;
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