import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children, initialScene }) {
  const [scene, setScene] = useState(initialScene);
  const [history, setHistory] = useState([]);

  function choose(choice) {
    if (choice.next) {
      setHistory(h => [...h, scene.id]);
      setScene(choice.next);
    }
  }

  function restart() {
    setHistory([]);
    setScene(initialScene);
  }

  return (
    <GameContext.Provider value={{ scene, choose, restart, history }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
