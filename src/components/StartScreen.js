import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function StartScreen() {
  const { updatePlayer } = useGame();
  const navigate = useNavigate();
  const [form, setForm] = useState({ creditScore: '', age: '', monthlyIncome: '', savings: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const creditScore = parseInt(form.creditScore, 10);
    const age = parseInt(form.age, 10);
    const monthlyIncome = parseFloat(form.monthlyIncome);
    const savings = parseFloat(form.savings);

    if (Number.isNaN(creditScore) || Number.isNaN(age) || Number.isNaN(monthlyIncome) || Number.isNaN(savings)) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    updatePlayer({ creditScore, age, monthlyIncome, savings });
    navigate('/game');
  }

  return (
    <main className="scene">
      <h1>Start: Your Financial Snapshot</h1>
      <p>Enter a few details so the game can tailor guidance.</p>
      <form onSubmit={handleSubmit} className="start-form">
        <label>
          Credit score
          <input name="creditScore" value={form.creditScore} onChange={handleChange} placeholder="e.g. 720" />
        </label>
        <label>
          Age
          <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 34" />
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
        <div style={{ marginTop: 12 }}>
          <button type="submit">Start the journey</button>
        </div>
      </form>
    </main>
  );
}
