import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Signup successful", result.user);
      // You can store additional user data in Firestore here if needed
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign up was cancelled. Please try again.');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked by your browser. Please allow popups and try again.');
          break;
        case 'auth/account-exists-with-different-credential':
          setError('An account already exists with the same email address but different sign-in credentials.');
          break;
        default:
          setError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Welcome to Fire Wood</h1>
        <p className="signup-subtitle">Join the medieval battle arena</p>
        
        <button 
          onClick={handleGoogleSignup} 
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
              Sign up with Google
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
          <p>By signing up, you agree to our</p>
          <div className="signup-links">
            <a href="/terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;