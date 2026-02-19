# 2048 Game (TypeScript, Vite) 🎮🧩

Built for fun: a classic 2048 puzzle that runs in the browser with a vanilla TypeScript codebase and Vite tooling.

## Tech stack

- 🟦 TypeScript for game logic and DOM updates
- ⚡ Vite for dev server and builds
- 🎨 Plain CSS for layout and tile styling

## Getting started

- Install deps: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Preview the production build: `npm run preview`

## Screenshots

![2048 board](public/2048_game_screenshot.png)
![2048 win](public/2048_game_win_screenshot.png)
![2048 game over](public/2048_game_over_screenshot.png)

## Approach & structure

The code is organized in an OOP style. All game state and move logic live in `game-logic`; the display side (banner, score, board) is handled in `game-ui`. The `proxy-game-logic` layer wraps the core: a single game instance, keyboard input, and saving progress to localStorage or sessionStorage. The entry point is `main.ts` — it sets up the proxy and UI handlers and refreshes the interface after each action.
