import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function NoQualify(){
  const navigate = useNavigate();
  const { player, clearPlayer } = useGame();

  function handleRestart(){
    clearPlayer();
    navigate('/');
  }

  return (
    <main className="scene no-qualify-screen">
      <div className="no-qualify-container">
        <h1 className="no-qualify-title">Unfortunately, you do not qualify for a home loan</h1>
        <p className="no-qualify-message">Based on a credit score of {player?.creditScore ?? '—'}, you currently fall below the minimum threshold for most mortgage products.</p>

        <div className="resources">
          <h2>Resources to improve your credit score</h2>
          <ul>
            <li>Review your credit report for errors and dispute any inaccuracies.</li>
            <li>Pay down outstanding balances, focusing on high-interest credit cards.</li>
            <li>Make all payments on time — payment history is the largest factor.</li>
            <li>Avoid opening new credit accounts while improving your score.</li>
            <li>Consider a secured credit card or credit-builder loan to rebuild history.</li>
          </ul>
        </div>

        <div style={{marginTop:20,display:'flex',gap:12,justifyContent:'center'}}>
          <button className="primary-button" onClick={handleRestart}>
            Start another adventure
          </button>
        </div>
      </div>
    </main>
  );
}
