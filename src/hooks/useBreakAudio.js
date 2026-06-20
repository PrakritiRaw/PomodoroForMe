import { useRef, useCallback, useEffect } from 'react';

// All cues keyed by seconds elapsed into the 5-minute break.
// 30s exercises each split at 15s for direction switches.
const BREAK_SCHEDULE = [
  { at: 0,   text: 'Break time. Left and right neck rotations. Gently rotate your head to the left.' },
  { at: 15,  text: 'Switch. Now rotate your head to the right.' },
  { at: 30,  text: 'Up and down neck movements. Slowly tilt your head up.' },
  { at: 45,  text: 'Switch. Now bring your chin down toward your chest.' },
  { at: 60,  text: 'Clockwise neck rotations. Slowly roll your head in a clockwise circle.' },
  { at: 75,  text: 'Switch. Now rotate anti-clockwise.' },
  { at: 90,  text: 'Shoulder rotations. Roll both shoulders clockwise.' },
  { at: 105, text: 'Switch. Now roll your shoulders anti-clockwise.' },
  { at: 120, text: 'Great work. Stand up and walk to get some water. You have 3 minutes.' },
  { at: 240, text: 'Start heading back to your desk.' },
  { at: 275, text: 'Break ending in 25 seconds. Take your seat.' },
];

const BREAK_DURATION = 5 * 60;

function useBreakAudio(phase, timeLeft, isRunning) {
  // Tracks which cue indices have already been spoken this break session.
  const spokenRef = useRef(new Set());
  const prevPhaseRef = useRef(phase);

  const speak = useCallback((text) => {
    // Cancel any in-progress speech before queuing the next cue so they don't overlap.
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Reset spoken set whenever a new break begins.
  useEffect(() => {
    if (phase === 'break' && prevPhaseRef.current !== 'break') {
      spokenRef.current = new Set();
    }
    // Cancel leftover speech when break ends.
    if (phase === 'focus' && prevPhaseRef.current === 'break') {
      window.speechSynthesis.cancel();
    }
    prevPhaseRef.current = phase;
  }, [phase]);

  // Fire cues based on real elapsed break time derived from timeLeft.
  useEffect(() => {
    if (phase !== 'break' || !isRunning) return;

    const elapsed = BREAK_DURATION - timeLeft;

    BREAK_SCHEDULE.forEach((cue, i) => {
      if (elapsed >= cue.at && !spokenRef.current.has(i)) {
        spokenRef.current.add(i);
        speak(cue.text);
      }
    });
  }, [timeLeft, phase, isRunning, speak]);
}

export default useBreakAudio;
