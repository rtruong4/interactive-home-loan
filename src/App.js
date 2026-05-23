import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import StartScreen from './components/StartScreen';
import LoanChoice from './components/LoanChoice';
import DocumentChecklist from './components/DocumentChecklist';
import NextSteps from './components/NextSteps';
import MortgageCalculator from './components/MortgageCalculator';
import PlayerBanner from './components/PlayerBanner';
import sampleScene from './game/scenes/sampleScene';

function App() {
  return (
    <BrowserRouter>
      <GameProvider initialScene={sampleScene}>
        <PlayerBanner />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/choose-loan" element={<LoanChoice />} />
          <Route path="/documents" element={<DocumentChecklist />} />
          <Route path="/next-steps" element={<NextSteps />} />
          <Route path="/calculator" element={<MortgageCalculator />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
