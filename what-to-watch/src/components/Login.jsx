import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import SignUp from './SignUp'; // Import the SignUp component

const Login = () => {
  const [activeTab, setActiveTab] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate =useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    axios.get('http://localhost:9000/getUser', { params: { email, password } })
      .then((res) => {
        if (res.data) {
          alert('Login Successful');
          localStorage.clear();
          localStorage.setItem('loggedInUser', res.data._id);
          navigate("/Home");
        } else {
          alert('Wrong Credentials');
        }
      })
      .catch((err) => alert('Error in Login'));
  };
  

  const renderContent = () => {
    if (activeTab === 'SignUp') {
      return <SignUp />;
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <a> <Link to="/SignUp">Sign Up</Link></a>
        </p>
      </div>
    );
  };


  return <main className="content">{renderContent()}</main>;
};

export default Login;
