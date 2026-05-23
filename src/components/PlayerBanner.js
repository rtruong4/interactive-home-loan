import React from 'react';
import { useGame } from '../context/GameContext';

export default function PlayerBanner() {
  const { player } = useGame();

  if (!player) return null;

  return (
    <aside className="player-banner">
      <div className="player-info">
        <div><strong>Credit:</strong> {player.creditScore ?? '—'}</div>
        <div><strong>Income:</strong> {player.monthlyIncome != null ? `$${player.monthlyIncome}` : '—'}</div>
        <div><strong>DTI:</strong> {player.debtToIncomeRatio != null ? `${player.debtToIncomeRatio}%` : '—'}</div>
        <div><strong>Savings:</strong> {player.savings != null ? `$${player.savings}` : '—'}</div>
        <div><strong>Loan:</strong> {player.loanType ?? '—'}</div>
      </div>
      
    </aside>
  );
}
