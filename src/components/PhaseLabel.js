function PhaseLabel({ phase }) {
  return (
    <p className={`phase-label ${phase === 'break' ? 'break' : ''}`}>
      {phase === 'focus' ? '🍅 Focus Time' : '☕ Break Time'}
    </p>
  );
}

export default PhaseLabel;