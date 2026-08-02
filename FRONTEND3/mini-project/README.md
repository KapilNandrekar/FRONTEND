# Friends Episode Explorer

A React app that fetches and displays every episode of Friends from a public API, with live search by episode name.

**Live site:** https://friendsinfor.netlify.app/

## What this is

A frontend task built around consuming a real REST API in React: fetching data on mount, managing loading/error states, and filtering a rendered list based on user input — using only `fetch` and React state, no external data-fetching library.

## Features

- Fetches all Friends episodes from the TVmaze API on page load
- Displays every episode as a card: name, season/episode number, air date, runtime, and summary (HTML tags stripped from the API's summary field)
- Search bar with a Search button — type an episode name and submit to filter the list to matching results
- Loading and error states while the initial fetch is in flight or if it fails
- Live count of how many episodes match the current search

## Stack

- React 19 (function components + hooks only, no class components)
- Vite as the build tool and dev server
- Plain CSS with custom properties (`index.css`, `SearchBox.css`, `EpisodeCard.css`) — no CSS framework or component library
- [TVmaze API](https://www.tvmaze.com/api) (`GET /shows/431/episodes`) as the data source

## Structure

```
FRONTEND3/mini-project/
├── src/
│   ├── App.jsx
│   ├── SearchBox.jsx      # fetches episodes, owns search state
│   ├── SearchBox.css
│   ├── EpisodeCard.jsx    # renders a single episode
│   ├── EpisodeCard.css
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## How the data flow works

- `SearchBox.jsx` fetches the full episode list once, inside a `useEffect` with an empty dependency array, on component mount.
- Two separate pieces of state track the search box: `inputValue` (updates on every keystroke, keeps the input controlled) and `query` (only updates when the search form is submitted). Filtering runs against `query`, not `inputValue` — that's what makes search a deliberate action instead of a live filter.
- `EpisodeCard` is a presentational component that receives a single episode object as a prop and handles its own summary-cleaning (`stripHtml`) and formatting (zero-padded season/episode numbers).

## Running locally

```bash
cd FRONTEND3/mini-project
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Known limitations

- Search matches on episode name only — no filtering by season, air date, or summary text.
- No pagination or virtualization; all ~236 episodes render at once (fine at this dataset size, would need addressing at larger scale).
- No automated tests.
