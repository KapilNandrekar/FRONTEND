# The One With The Quiz — Friends Trivia

An interactive multiple-choice quiz built with vanilla JavaScript and DOM manipulation — no framework, no build step.

Live site: https://friendsqui.netlify.app/

## What this is

An 8-question Friends trivia quiz that tests core JS fundamentals: managing state without a framework, manipulating the DOM directly, handling timed events, and driving UI purely through class toggles and re-renders triggered by hand.

## Features

- 8 multiple-choice questions, mixing straight trivia and "identify the character" prompts
- One question shown at a time, with a progress bar
- 20-second countdown timer per question; running out locks in "no answer" automatically
- Immediate visual feedback on the selected option (correct/incorrect highlighting) before advancing
- Running score tracker
- Final results screen with a score percentage and a tiered message/badge (e.g. "Central Perk Regular")
- Restart button that resets all state and returns to question 1

## Stack

- HTML + vanilla JavaScript (no framework)
- [Tailwind CSS](https://tailwindcss.com/) via CDN script for utility classes
- Hand-written CSS (`style.css`) for custom properties, fonts, and the timer bar animation
- Google Fonts (Bungee, Poppins)

## How the logic works

- All application state (`current` question index, `score`, `selectedIndex`, `locked`, timer state) lives in module-scoped variables inside an IIFE (`(function(){ ... })()`), which keeps them out of the global scope.
- Screens (welcome / quiz / results) are plain `<section>` elements toggled via an `active` class — no routing.
- Each render cycle clears and rebuilds the option buttons with `createElement`, rather than reusing existing DOM nodes.
- The countdown bar's width is animated with a CSS `transition`, reset on each question by briefly disabling the transition, forcing a reflow (`void fill.offsetWidth`), then re-enabling it — required so the width snaps back instantly instead of visibly animating backward.

## Structure

```
FRONTEND2/
├── index.html
├── script.js
└── style.css
```

## Known limitations

- No persistence — refreshing mid-quiz loses all progress (no `localStorage`).
- Single-player only; no leaderboard or shared state.
- Question bank is fixed at 8 hardcoded questions, not loaded from an external source.

## Running locally

No build step required — open `index.html` directly in a browser, or serve the folder with any static server.
