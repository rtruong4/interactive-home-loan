import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function BlueWandSprite({ className }) {
  return (
    <svg className={className} width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="18" y="46" width="56" height="8" rx="4" transform="rotate(-24 18 46)" fill="#1E70D7" />
      <polygon points="70,18 78,30 62,30" fill="#7FB9FF" stroke="#4B7CCF" strokeWidth="1.2" />
      <circle cx="74" cy="24" r="4" fill="#D6EBFF" />
      <path d="M68 22c4-2 6-4 8-8" stroke="#97C4FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function WandSprite({ className }) {
  return (
    <svg className={className} width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="18" y="46" width="56" height="8" rx="4" transform="rotate(-24 18 46)" fill="#5A3E2B" />
      <polygon points="70,18 78,30 62,30" fill="#F2D06F" stroke="#8b6d3f" strokeWidth="1.2" />
      <circle cx="74" cy="24" r="4" fill="#ffd966" />
    </svg>
  );
}

export default function LoanChoice() {
  const navigate = useNavigate();
  const { updatePlayer, player } = useGame();

  function choose(type) {
    updatePlayer({ loanType: type });
    navigate('/documents');
  }

  // FHA-specific guidance based on credit score
  let fhaGuidance = 'Typical FHA down payment is 3.5% for qualifying credit scores.';
  const cs = player?.creditScore;
  if (typeof cs === 'number') {
    if (cs >= 500 && cs <= 579) {
      fhaGuidance = 'With a credit score between 500 and 579, FHA requires a down payment of 10% or greater.';
    } else if (cs >= 580 && cs <= 619) {
      fhaGuidance = 'With a credit score between 580 and 619, FHA requires a down payment of more than 3.5%.';
    } else if (cs >= 620) {
      fhaGuidance = 'Your credit score qualifies for the standard FHA 3.5% down payment in many cases.';
    } else if (cs < 500) {
      fhaGuidance = 'Credit scores below 500 typically do not qualify for FHA; higher down payments or alternative options may apply.';
    }
  }

  return (
    <main className="scene loan-choice-screen">
      <div className="loan-choices">
        <h1 className="loan-choice-title">Choose your wand (loan)</h1>
        <div className="loan-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
            <BlueWandSprite className="loan-icon" />
            <h2 style={{margin:0}}>FHA Loan</h2>
          </div>
          <p className="muted">Government-backed loan with lower down payment requirements and more flexible credit rules.</p>
          <div className="loan-note" style={{marginBottom:12,fontWeight:600,color:'#4a2f17'}}>{fhaGuidance}</div>
          <ul>
            <li>More lenient credit score requirements</li>
            <li>Mortgage insurance required</li>
          </ul>
          <button className="choose-button" onClick={() => choose('FHA')}>Take the FHA wand</button>
        </div>

        <div className="loan-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
            <WandSprite className="loan-icon" />
            <h2 style={{margin:0}}>Conventional Loan</h2>
          </div>
          <p className="muted">Standard mortgage with competitive rates for stronger credit and larger down payments.</p>
          <ul>
            <li>Typically lower long-term cost with higher credit</li>
            <li>No mortgage insurance with 20% down</li>
            <li>Wide range of term/options</li>
            <li>Minimum credit score of 620</li>
            <li>Minimum 3% down payment</li>
          </ul>
          <button className="choose-button" onClick={() => choose('Conventional')}>Take the Conventional wand</button>
        </div>
      </div>
    </main>
  );
}
