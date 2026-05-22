import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import SceneView from './components/Scene';
import StartScreen from './components/StartScreen';
import PlayerBanner from './components/PlayerBanner';
import sampleScene from './game/scenes/sampleScene';

function App() {
  return (
    <BrowserRouter>
      <GameProvider initialScene={sampleScene}>
        <PlayerBanner />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/game" element={<SceneView />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
