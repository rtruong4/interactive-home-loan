# interactive-home-loan

This repository contains a minimal Create React App scaffold for an interactive story game that teaches users how to apply for a home loan.

Quick start

Install dependencies and run locally:

```bash
npm install
npm start
```

Key files

- [src/App.js](src/App.js)
- [src/context/GameContext.js](src/context/GameContext.js)
- [src/game/StoryEngine.js](src/game/StoryEngine.js)
- [src/game/scenes/sampleScene.js](src/game/scenes/sampleScene.js)
- [src/components/Scene.js](src/components/Scene.js)
- [src/components/Choice.js](src/components/Choice.js)
 - [src/components/StartScreen.js](src/components/StartScreen.js)

Next steps

- Expand scenes in `src/game/scenes/` using `makeScene` and `makeChoice`.
- Add persistence (localStorage) to `GameContext` and richer branching logic.
- Replace placeholder copy with accurate steps for applying for a home loan.
 - Expand the `StartScreen` form to collect additional borrower details and validation.
