import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children, initialScene }) {
  const [scene, setScene] = useState(initialScene);
  const [history, setHistory] = useState([]);
  const defaultPlayer = { creditScore: null, age: null, monthlyIncome: null, savings: null };
  const [player, setPlayer] = useState(() => {
    try {
      const raw = localStorage.getItem('ihl_player');
      return raw ? JSON.parse(raw) : defaultPlayer;
    } catch (e) {
      return defaultPlayer;
    }
  });

  function choose(choice) {
    if (!choice) return;
    if (choice.next) {
      setHistory(h => [...h, scene?.id]);
      setScene(choice.next);
    }
    if (choice.action === 'restart') {
      restart();
    }
  }

  function restart() {
    setHistory([]);
    setPlayer({ creditScore: null, age: null, monthlyIncome: null, savings: null });
    setScene(initialScene);
  }

  function updatePlayer(updates) {
    setPlayer(p => {
      const next = { ...p, ...updates };
      try {
        localStorage.setItem('ihl_player', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  }

  useEffect(() => {
    try {
      localStorage.setItem('ihl_player', JSON.stringify(player));
    } catch (e) {
      // ignore write failures (e.g., privacy mode)
    }
  }, [player]);

  function clearPlayer() {
    try {
      localStorage.removeItem('ihl_player');
    } catch (e) {
      // ignore
    }
    setPlayer(defaultPlayer);
  }

  return (
    <GameContext.Provider value={{ scene, choose, restart, history, player, updatePlayer, clearPlayer }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
