import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import SceneView from './components/Scene';
import sampleScene from './game/scenes/sampleScene';

function App() {
  return (
    <BrowserRouter>
      <GameProvider initialScene={sampleScene}>
        <Routes>
          <Route path="/" element={<SceneView />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
