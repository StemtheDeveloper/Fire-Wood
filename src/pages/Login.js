import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      navigate('/profile');
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Login was cancelled. Please try again.');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked by your browser. Please allow popups and try again.');
          break;
        default:
          setError('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Fire Wood</h1>
        <p className="signup-subtitle">Welcome back to the arena</p>
        
        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="google-signup-button"
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="google-icon" 
              />
              Sign in with Google
            </>
          )}
        </button>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="signup-info">
          <p>Don't have an account?</p>
          <div className="signup-links">
            <a href="/signup">Sign up</a>
            <span className="separator">•</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
