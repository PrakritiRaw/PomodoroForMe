# 🍅 PomodoroForMe

PomodoroForMe is a clean, minimal focus timer built with React. It cycles through 25-minute focus sessions and 5-minute breaks, featuring a live countdown display, an animated circular progress ring and session tracking. Built with functional components, custom hooks, and the Web Audio API no external dependencies.

## Features
- 25-minute focus sessions with 5-minute breaks
- Live countdown display (HH:MM:SS)
- Animated circular progress ring
- Session tracking with 🍅 icons
- Soft bell sound at the end of each session
- Start, Pause, and Reset controls

## Built With
- React (functional components + hooks)
- Web Audio API (for the bell sound — no external libraries)
- CSS (custom animations and dark theme)

## Getting Started

Clone the repository and run:

npm install
npm start

The app will open at http://localhost:3000

## Project Structure

src/
  components/
    PomodoroTimer.js
    TimerDisplay.js
    PhaseLabel.js
    ButtonGroup.js
    ProgressRing.js
    SessionCounter.js
  hooks/
    useTing.js
  App.js
  App.css
  index.js
  index.css