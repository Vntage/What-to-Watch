import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignUp.css';
import Login from './Login'; // Import Login component
import axios from 'axios';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('SignUp');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

    const handleSignUp = (event, firstName, lastName, username, password) => {
        axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password })
            .then((res) => {
                alert('Signup Succesful!');
                navigate('/Login');
            })
            .catch((err) => alert('Error in Signing Up'))
    }

  const renderContent = () => {
    if (activeTab === 'Login') {
      return <Login />;
    }

    return (
      <div className="signup-container">
        <h2>Create an Account!</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="signup-btn" onClick={(event) => handleSignUp(event, username, email, password)}>
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <a onClick={() => setActiveTab('Login')}>Sign In</a>
        </p>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert(`Account created for: ${username}`);
    // Add sign-up logic (e.g., API call or Firebase auth)
  };

  return <main className="content">{renderContent()}</main>;
};

export default SignUp;
