import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MortgageCalculator(){
  const navigate = useNavigate();
  const [housePrice, setHousePrice] = useState('');
  const [interest, setInterest] = useState('');
  const [term, setTerm] = useState(30);
  const [downPayment, setDownPayment] = useState('0');
  const [result, setResult] = useState(null);

  function toNumber(v){
    const n = parseFloat(String(v).replace(/[^0-9.]/g,''));
    return Number.isFinite(n) ? n : 0;
  }

  function formatCurrencyInput(val) {
    if (val == null) return '';
    const cleaned = String(val).replace(/[^0-9.]/g,'');
    if (cleaned === '') return '';
    const parts = cleaned.split('.');
    const intPart = parts[0] || '0';
    const decPart = parts[1] || '';
    const formattedInt = Number(intPart).toLocaleString();
    return decPart ? `${formattedInt}.${decPart}` : formattedInt;
  }

  function rangeBackground(value, min = 0, max = 100, fill = '#2e8b57', empty = '#e0d6c1') {
    const v = Number(value || 0);
    const m = Number(min);
    const M = Number(max);
    const pct = M === m ? 0 : Math.max(0, Math.min(100, Math.round(((v - m) / (M - m)) * 100)));
    return `linear-gradient(90deg, ${fill} ${pct}%, ${empty} ${pct}%)`;
  }

  function calculate() {
    const price = toNumber(housePrice);
    const dp = toNumber(downPayment);

    if (price <= 0) {
      setResult({ error: 'Enter a valid house price.' });
      return;
    }

    if (dp > price) {
      setResult({ error: 'Down payment cannot exceed the house price.' });
      return;
    }

    const principal = Math.max(0, price - dp);
    const annualRate = toNumber(interest) / 100;
    const monthlyRate = annualRate / 12;
    const months = Math.max(1, Math.round(term * 12));

    if (principal <= 0 || monthlyRate < 0 || months <= 0) {
      setResult({ error: 'Enter valid values (price and positive term).' });
      return;
    }

    // Monthly payment formula
    const monthly = monthlyRate === 0
      ? principal / months
      : principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    const totalPayment = monthly * months + dp;
    const totalInterest = monthly * months - principal;

    setResult({ monthly: monthly, totalPayment, totalInterest, principal, months });
  }

  return (
    <main className="scene calculator-screen">
      <div className="calculator-container">
        <h1 className="calculator-title">Magic Mortgage Cost Calculator</h1>
        <p className="calculator-sub">Enter an example house price and interest rate to estimate costs.</p>

        <div className="form-row">
          <label>
            House Price
            <input type="text" value={housePrice} onChange={e=>setHousePrice(formatCurrencyInput(e.target.value))} placeholder="e.g. 350,000" />
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              value={toNumber(housePrice)}
              onChange={e=>setHousePrice(formatCurrencyInput(e.target.value))}
              className="slider"
              style={{'--slider-track': rangeBackground(toNumber(housePrice), 0, 10000000)}}
            />
          </label>

          <label>
            Down Payment
            <input type="text" value={downPayment} onChange={e=>setDownPayment(formatCurrencyInput(e.target.value))} placeholder="e.g. 35,000" />
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              value={toNumber(downPayment)}
              onChange={e=>setDownPayment(formatCurrencyInput(e.target.value))}
              className="slider"
              style={{'--slider-track': rangeBackground(toNumber(downPayment), 0, 10000000)}}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Interest Rate (annual %)
            <input type="text" value={interest} onChange={e=>setInterest(e.target.value)} placeholder="e.g. 4.25" />
            <input
              type="range"
              min="0"
              max="10"
              step="0.01"
              value={Number(interest) || 0}
              onChange={e=>setInterest(Number(e.target.value).toFixed(2))}
              className="slider"
              style={{'--slider-track': rangeBackground(Number(interest) || 0, 0, 10)}}
            />
          </label>

          <label>
            Term (years)
            <input type="number" value={term} onChange={e=>setTerm(e.target.value)} min="0" />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Number(term) || 0}
              onChange={e=>setTerm(e.target.value)}
              className="slider"
              style={{'--slider-track': rangeBackground(Number(term) || 0, 0, 100)}}
            />
          </label>
        </div>

          <div style={{marginTop:16,display:'flex',alignItems:'center',justifyContent:'center',gap:12}}>
            <svg className="calc-wand" width="56" height="56" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="18" y="46" width="56" height="8" rx="4" transform="rotate(-24 18 46)" fill="#5A3E2B" />
              <polygon points="70,18 78,30 62,30" fill="#F2D06F" stroke="#8b6d3f" strokeWidth="1.2" />
              <circle cx="74" cy="24" r="4" fill="#ffd966" />
            </svg>
            <button className="primary-button" onClick={calculate} style={{marginRight:12}}>Calculate</button>
            <button className="secondary-button" onClick={()=>navigate(-1)}>Back</button>
          </div>

        {result && (
          <div className="calc-results">
            {result.error ? (
              <p className="status-incomplete">{result.error}</p>
            ) : (
              <div>
                <p><strong>Loan Amount:</strong> ${result.principal.toLocaleString()}</p>
                <p><strong>Monthly Payment:</strong> ${result.monthly.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                <p><strong>Total Interest (over {result.months} months):</strong> ${result.totalInterest.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                <p><strong>Total Paid (including down payment):</strong> ${result.totalPayment.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
