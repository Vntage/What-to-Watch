import React, { useState } from 'react';
import './Login.css';
import SignUp from './SignUp'; // Import the SignUp component

const Login = () => {
  const [activeTab, setActiveTab] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const renderContent = () => {
    if (activeTab === 'SignUp') {
      return <SignUp />;
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <a onClick={() => setActiveTab('SignUp')}>Sign Up</a>
        </p>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    alert(`Logged in with: ${email}`);
    // Add login logic (e.g., API call or Firebase auth)
  };

  return <main className="content">{renderContent()}</main>;
};

export default Login;
