import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const progressSteps = [
  { path: '/', label: 'Start' },
  { path: '/choose-loan', label: 'Loan Choice' },
  { path: '/documents', label: 'Documents' },
  { path: '/next-steps', label: 'Next Steps' },
];

export default function PlayerBanner() {
  const { player } = useGame();
  const location = useLocation();

  if (!player) return null;

  const currentIndex = progressSteps.findIndex(step => step.path === location.pathname);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progress = (activeIndex / (progressSteps.length - 1)) * 100;

  return (
    <aside className="player-banner">
      <div className="player-info">
        <div><strong>Credit:</strong> {player.creditScore ?? '—'}</div>
        <div><strong>Income:</strong> {player.monthlyIncome != null ? `$${player.monthlyIncome}` : '—'}</div>
        <div><strong>DTI:</strong> {player.debtToIncomeRatio != null ? `${player.debtToIncomeRatio}%` : '—'}</div>
        <div><strong>Savings:</strong> {player.savings != null ? `$${player.savings}` : '—'}</div>
        <div><strong>Loan:</strong> {player.loanType ?? '—'}</div>
      </div>
      <div className="progress-tracker">
        <div className="progress-header">
          <span>Journey Progress</span>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <span className="progress-thumb" style={{ left: `${progress}%` }} role="img" aria-label="wizard">🧙‍♂️</span>
          <span className="progress-house" role="img" aria-label="house">🏠</span>
        </div>
        <div className="progress-steps">
          {progressSteps.map((step, index) => (
            <div key={step.path} className={`progress-step ${index <= activeIndex ? 'active' : ''}`}>
              <span>{index + 1}</span>
              <small>{step.label}</small>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
