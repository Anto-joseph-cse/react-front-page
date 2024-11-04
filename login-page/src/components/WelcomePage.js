// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './WelcomePage.css'; // Import the CSS file for styling

function WelcomePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleTryClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="welcome-page">
      
      <div className="glass-container">
      <h1>Welcome to Evidence Protection</h1>
        <p className="text-content">
          Evidence protection is essential for maintaining the integrity of the legal process by ensuring that evidence remains credible and unaltered, which is vital for fair trials. It promotes accountability, supports thorough investigations, and preserves public trust in law enforcement. By complying with legal standards for evidence handling, it helps prevent legal challenges and protects sensitive information from unauthorized access. Ultimately, safeguarding evidence is crucial for upholding justice and ensuring fair legal processes. Make your evidence with us.
        </p>
        <div className="button-container">
          <button className="try-button" onClick={handleTryClick}>Try Now</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
