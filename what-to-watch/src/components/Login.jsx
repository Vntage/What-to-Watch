import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    axios.get('http://localhost:9000/getUser', { params: { email, password } })
      .then((res) => {
        if (res.data) {
          alert('Login Successful');
          localStorage.setItem('loggedInUser', res.data._id);
          localStorage.setItem('userRole', res.data.role);
          navigate("/Home");
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert('Invalid email or password');
        } else {
          alert('Server error while logging in');
        }
      });
  };

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
      <p> Don't have an account? <Link to="/SignUp">Sign Up</Link> </p>
    </div>
  );
};

export default Login;
