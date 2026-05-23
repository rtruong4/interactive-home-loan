import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function StartScreen() {
  const { updatePlayer } = useGame();
  const navigate = useNavigate();
  const [form, setForm] = useState({ creditScore: '', debtToIncomeRatio: '', monthlyIncome: '', savings: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const creditScore = parseInt(form.creditScore, 10);
    const debtToIncomeRatio = parseFloat(form.debtToIncomeRatio);
    const monthlyIncome = parseFloat(form.monthlyIncome);
    const savings = parseFloat(form.savings);

    if (
      Number.isNaN(creditScore) ||
      Number.isNaN(debtToIncomeRatio) ||
      Number.isNaN(monthlyIncome) ||
      Number.isNaN(savings)
    ) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (debtToIncomeRatio < 0 || debtToIncomeRatio > 100) {
      setError('Debt-to-income ratio must be between 0 and 100.');
      return;
    }

    if (creditScore < 300 || creditScore > 850) {
      setError('Credit score must be between 300 and 850.');
      return;
    }

    updatePlayer({ creditScore, debtToIncomeRatio, monthlyIncome, savings });
    if (creditScore < 500) {
      navigate('/no-qualify');
    } else {
      navigate('/choose-loan');
    }
  }

  return (
    <main className="scene story-screen">
      <div className="story-grid">
        <section className="character-panel">
          <div className="character-avatar">🧙‍♂️</div>
          <div className="speech-bubble">
            <p>Greetings, traveler. I am Fizzlewig the wizard gnome.</p>
            <p>Share your financial tale and I shall help you navigate the home loan quest.</p>
          </div>
        </section>
        <section className="start-panel">
          <div className="start-panel__header">
            <div>
              <h1>Step into the Loan Keep</h1>
              <p>Provide your details below, and the ancient scrolls will reveal your path.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="start-form">
            <label>
              Credit score
              <input name="creditScore" value={form.creditScore} onChange={handleChange} placeholder="e.g. 720" />
            </label>
            <label>
              Debt-to-income ratio
              <input
                name="debtToIncomeRatio"
                value={form.debtToIncomeRatio}
                onChange={handleChange}
                placeholder="0 - 100"
              />
            </label>
            <label>
              Monthly income
              <input name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} placeholder="e.g. 5000" />
            </label>
            <label>
              Savings
              <input name="savings" value={form.savings} onChange={handleChange} placeholder="e.g. 20000" />
            </label>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="primary-button">Start the journey</button>
          </form>
        </section>
      </div>
    </main>
  );
}
