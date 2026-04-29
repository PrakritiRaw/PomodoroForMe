function ButtonGroup({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="button-group">

      <button
        className="btn btn-start"
        onClick={onStart}
        disabled={isRunning}
      >
        Start
      </button>

      <button
        className="btn btn-pause"
        onClick={onPause}
        disabled={!isRunning}
      >
        Pause
      </button>

      <button
        className="btn btn-reset"
        onClick={onReset}
        disabled={!isRunning}
      >
        Reset
      </button>

    </div>
  );
}

export default ButtonGroup;