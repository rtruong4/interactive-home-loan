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

  function calculate() {
    const price = toNumber(housePrice);
    const dp = toNumber(downPayment);
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
        <h1 className="calculator-title">Cost Calculator</h1>
        <p className="calculator-sub">Enter an example house price and interest rate to estimate costs.</p>

        <div className="form-row">
          <label>House Price
            <input type="text" value={housePrice} onChange={e=>setHousePrice(e.target.value)} placeholder="e.g. 350000" />
          </label>
          <label>Down Payment
            <input type="text" value={downPayment} onChange={e=>setDownPayment(e.target.value)} placeholder="e.g. 35000" />
          </label>
        </div>

        <div className="form-row">
          <label>Interest Rate (annual %)
            <input type="text" value={interest} onChange={e=>setInterest(e.target.value)} placeholder="e.g. 4.25" />
          </label>
          <label>Term (years)
            <input type="number" value={term} onChange={e=>setTerm(e.target.value)} min="1" />
          </label>
        </div>

        <div style={{marginTop:16}}>
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
                <p><strong>Monthly Payment:</strong> ${result.monthly.toFixed(2)}</p>
                <p><strong>Total Interest (over {result.months} months):</strong> ${result.totalInterest.toFixed(2)}</p>
                <p><strong>Total Paid (including down payment):</strong> ${result.totalPayment.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
