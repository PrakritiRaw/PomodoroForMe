function SessionCounter({ sessions }) {

  // Create an array of length `sessions` and map each to a tomato emoji
  // e.g. sessions=3 → ['🍅','🍅','🍅']
  const tomatoes = Array.from({ length: sessions }, (_, i) => (
    <span key={i} className="tomato">🍅</span>
  ));

  return (
    <div className="session-counter">
      <p className="session-label">Sessions completed</p>
      <div className="tomatoes">
        {sessions === 0
          ? <span className="session-empty">None yet — stay focused!</span>
          : tomatoes
        }
      </div>
    </div>
  );
}

export default SessionCounter;