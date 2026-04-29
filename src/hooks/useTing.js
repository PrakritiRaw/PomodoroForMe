import { useRef } from 'react';

function useTing() {

  // useRef stores a value that persists across renders
  // but unlike useState, changing it does NOT trigger a re-render
  // Perfect for storing the AudioContext — we don't want a re-render when it's created
  const audioCtxRef = useRef(null);

  const playTing = () => {

    // Create the AudioContext only once, the first time playTing is called
    // (browsers require a user interaction before allowing sound — this handles that)
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    const ctx = audioCtxRef.current;

    // --- First tone (the "ting") ---
    const oscillator1 = ctx.createOscillator();
    const gainNode1 = ctx.createGain(); // GainNode controls volume

    oscillator1.connect(gainNode1);
    gainNode1.connect(ctx.destination); // destination = your speakers

    oscillator1.type = 'sine';          // sine wave = smooth, bell-like tone
    oscillator1.frequency.setValueAtTime(880, ctx.currentTime); // A5 note

    // Start loud, fade out smoothly (gives the "ting" shape)
    gainNode1.gain.setValueAtTime(0.6, ctx.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    oscillator1.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 1.2);

    // --- Second tone (a softer harmony underneath) ---
    const oscillator2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(ctx.destination);

    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 note — harmony

    gainNode2.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

    oscillator2.start(ctx.currentTime);
    oscillator2.stop(ctx.currentTime + 1.0);
  };

  // Return the function so any component can call it
  return { playTing };
}

export default useTing;