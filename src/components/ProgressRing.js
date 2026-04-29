import { useMemo } from 'react';

// These are the fixed measurements of our SVG circle
const SIZE = 340;        // width & height of the SVG canvas
const STROKE = 6;        // how thick the ring line is
const RADIUS = (SIZE / 2) - (STROKE * 2);  // radius of the circle
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // total length of the circle's edge

function ProgressRing({ timeLeft, phase }) {

  // Total duration depends on which phase we're in
  const totalDuration = phase === 'focus' ? 25 * 60 : 5 * 60;

  // useMemo recalculates offset only when timeLeft or phase changes
  const offset = useMemo(() => {
    const progress = timeLeft / totalDuration; // 1.0 = full, 0.0 = empty
    return CIRCUMFERENCE * (1 - progress);     // how much to "shift" the dash
  }, [timeLeft, totalDuration]);

  const ringColor = phase === 'focus' ? '#ff6b6b' : '#6bcbff';

  return (
    <svg
      className="progress-ring"
      width={SIZE}
      height={SIZE}
    >
      {/* Background circle (the dim track) */}
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="#2a2a2a"
        strokeWidth={STROKE}
      />

      {/* Foreground circle (the progress) */}
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={ringColor}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        // Rotate so it starts from the top (SVG starts from 3 o'clock by default)
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.6s ease' }}
      />
    </svg>
  );
}

export default ProgressRing;