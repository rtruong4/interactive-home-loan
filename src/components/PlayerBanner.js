import React from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

export default function PlayerBanner() {
  const { player, clearPlayer } = useGame();
  const navigate = useNavigate();

  function handleClear() {
    clearPlayer();
    navigate('/');
  }

  if (!player) return null;

  return (
    <aside className="player-banner">
      <div className="player-info">
        <div><strong>Credit:</strong> {player.creditScore ?? '—'}</div>
        <div><strong>Income:</strong> {player.monthlyIncome != null ? `$${player.monthlyIncome}` : '—'}</div>
        <div><strong>DTI:</strong> {player.debtToIncomeRatio != null ? `${player.debtToIncomeRatio}%` : '—'}</div>
        <div><strong>Savings:</strong> {player.savings != null ? `$${player.savings}` : '—'}</div>
      </div>
      <div className="player-actions">
        <button className="clear-player" onClick={handleClear}>Clear data</button>
      </div>
    </aside>
  );
}
