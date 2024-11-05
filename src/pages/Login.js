import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Import the auth from the configuration

const Login = () => {
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    console.log("Google Login button clicked"); // Debugging log
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Login successful"); // Debugging log
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
