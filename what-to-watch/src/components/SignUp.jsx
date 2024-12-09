import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    axios.post('http://localhost:9000/createUser', {
      username,
      email,
      password
    })
      .then((res) => {
        navigate('/Login');
        alert('Signup Succesful!');
      })
      .catch((err) => alert('Error in Signing Up'))
  }

  return (
    <main className="content">
      <div className="signup-container">
        <h2>Create an Account!</h2>
        <form onSubmit={handleSignUp} className="signup-form">
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
          <button type="submit" className="signup-btn" >
            Sign Up
          </button>
        </form>
        <p>Already have an account? <Link to="/Login">Log In</Link></p>
      </div>
    </main>
  );
};


export default SignUp;
