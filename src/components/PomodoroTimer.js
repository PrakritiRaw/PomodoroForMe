import TimerDisplay from './TimerDisplay';
import PhaseLabel from './PhaseLabel';
import ButtonGroup from './ButtonGroup';
import ProgressRing from './ProgressRing';
import SessionCounter from './SessionCounter';

function PomodoroTimer({ timeDisplay, timeLeft, phase, isRunning, sessions, onStart, onPause, onReset }) {
  return (
    <div className="app">

      <h1 className="title">Pomodoro Timer</h1>

      <div className="ring-wrapper">
        <ProgressRing timeLeft={timeLeft} phase={phase} />
        <div className="ring-inner">
          <PhaseLabel phase={phase} />
          <TimerDisplay
            timeDisplay={timeDisplay}
            phase={phase}
            isRunning={isRunning}
          />
        </div>
      </div>

      <ButtonGroup
        isRunning={isRunning}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
      />

      <SessionCounter sessions={sessions} />

    </div>
  );
}

export default PomodoroTimer;