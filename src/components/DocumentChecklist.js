import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function DocumentChecklist() {
  const navigate = useNavigate();
  const { player } = useGame();
  
  const [checked, setChecked] = useState({
    identity: false,
    income: false,
    assets: false,
    giftLetter: false,
    brokerage: false,
  });

  function handleCheck(doc) {
    setChecked(prev => ({ ...prev, [doc]: !prev[doc] }));
  }

  function handleContinue() {
    navigate('/next-steps');
  }

  const allRequiredChecked = checked.identity && checked.income && checked.assets;

  return (
    <main className="scene document-checklist-screen">
      <div className="checklist-container">
        <h1 className="checklist-title">Gather Your Documents</h1>
        <p className="checklist-subtitle">
          Your journey continues! Collect the documents needed for your {player?.loanType || 'loan'} application.
        </p>

        <div className="checklist-section">
          <h2 className="section-heading">📋 Required Documents</h2>
          <div className="checklist-items">
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={checked.identity}
                onChange={() => handleCheck('identity')}
                className="checklist-checkbox"
              />
              <span>Proof of Identity (Driver's License, Passport)</span>
            </label>
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={checked.income}
                onChange={() => handleCheck('income')}
                className="checklist-checkbox"
              />
              <span>Income Verification (Pay stubs, Tax returns)</span>
            </label>
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={checked.assets}
                onChange={() => handleCheck('assets')}
                className="checklist-checkbox"
              />
              <span>Asset Verification (Bank statements, Investment accounts)</span>
            </label>
          </div>
        </div>

        <div className="checklist-section">
          <h2 className="section-heading">⭐ Optional Documents</h2>
          <div className="checklist-items">
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={checked.giftLetter}
                onChange={() => handleCheck('giftLetter')}
                className="checklist-checkbox"
              />
              <span>Gift Letter (If receiving down payment assistance)</span>
            </label>
            <label className="checklist-item">
              <input
                type="checkbox"
                checked={checked.brokerage}
                onChange={() => handleCheck('brokerage')}
                className="checklist-checkbox"
              />
              <span>Brokerage Statements (Investment assets)</span>
            </label>
          </div>
        </div>

        <div className="checklist-status">
          {allRequiredChecked ? (
            <p className="status-complete">✨ All required documents gathered! Ready to proceed.</p>
          ) : (
            <p className="status-incomplete">Still gathering documents...</p>
          )}
        </div>

        <button
          className="primary-button"
          onClick={handleContinue}
          style={{ marginTop: '24px' }}
          disabled={!allRequiredChecked}
          aria-disabled={!allRequiredChecked}
          title={!allRequiredChecked ? 'Please check all required documents to continue' : 'Continue'}
        >
          Continue Your Journey
        </button>
      </div>
    </main>
  );
}
