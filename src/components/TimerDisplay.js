function TimerDisplay({ timeDisplay, phase, isRunning }) {
  const classes = [
    'timer-display',
    isRunning ? 'running' : '',
    phase === 'break' ? 'break' : ''
  ].join(' ');

  return (
    <div className={classes}>
      {timeDisplay}
    </div>
  );
}

export default TimerDisplay;