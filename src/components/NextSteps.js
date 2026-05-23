import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function NextSteps() {
  const navigate = useNavigate();
  const { player, clearPlayer } = useGame();

  function handleRestart() {
    clearPlayer();
    navigate('/');
  }

  return (
    <main className="scene next-steps-screen">
      <div className="next-steps-container">
        <h1 className="next-steps-title">Your Journey Continues</h1>
        
        <div className="next-steps-content">
          <div className="completion-badge">✨ Quest Complete ✨</div>
          
          <p className="next-steps-message">
            Congratulations! You have gathered all the required information for your {player?.loanType || 'loan'} application.
          </p>

          <div className="info-section">
            <h2>What's Next?</h2>
            <p>
              You're now ready to seek out approved loan sources. Here are some resources to explore:
            </p>
            <ul className="resources-list">
              <li><strong>Banks & Credit Unions:</strong> Contact local banks and credit unions to compare rates and terms for your loan type.</li>
              <li><strong>Mortgage Brokers:</strong> Work with a mortgage broker who can connect you with multiple lenders.</li>
              <li><strong>Online Lenders:</strong> Explore online mortgage platforms for additional options and quick pre-qualification.</li>
              <li><strong>Government Programs:</strong> Investigate first-time homebuyer programs that may apply to your situation.</li>
            </ul>
          </div>

          <div className="tips-section">
            <h2>Pro Tips</h2>
            <ul className="tips-list">
              <li>Get pre-qualified with multiple lenders to compare offers</li>
              <li>Don't apply for new credit before closing</li>
              <li>Keep your financial documents organized and accessible</li>
              <li>Ask about down payment assistance programs</li>
            </ul>
          </div>

          <p className="closing-message">
            Your adventure in the world of home loans has just begun. Best of luck on your journey!
          </p>
        </div>

        <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:24}}>
          <button 
            className="secondary-button" 
            onClick={() => navigate('/calculator')}
          >
            Open Cost Calculator
          </button>
          <button 
            className="primary-button" 
            onClick={handleRestart}
          >
            Start a New Adventure
          </button>
        </div>
      </div>
    </main>
  );
}
