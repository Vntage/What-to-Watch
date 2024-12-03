import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Quiz from './components/Quiz';
import MovieRecommendations from './components/MovieRecommendations';
import MovieReview from './components/MovieReview';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'About':
        return <About />;
      case 'MovieRecommendations':
        return <MovieRecommendations />;
      case 'Contact':
        return <Contact />;
      case 'Quiz':
        return <Quiz />;
      case 'MovieReview':
        return <MovieReview />;
      case 'SignUp':
        return <SignUp />;
      case 'Login':
        return <Login />
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <nav className="tabbar">
        <button
          className={`tab ${activeTab === 'Home' ? 'active' : ''}`}
          onClick={() => setActiveTab('Home')}
        >
          Home
        </button>
        <button
          className={`tab ${activeTab === 'About' ? 'active' : ''}`}
          onClick={() => setActiveTab('About')}
        >
          About
        </button>
        <button
          className={`tab ${activeTab === 'MovieRecommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('MovieRecommendations')}
        >
          Movie Recommendations
        </button>
        <button
          className={`tab ${activeTab === 'Contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('Contact')}
        >
          Contact
        </button>
        <button
          className={`tab ${activeTab === 'Quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('Quiz')}
        >
          Quiz
        </button>
        <button
          className={`tab ${activeTab === 'MovieReview' ? 'active' : ''}`}
          onClick={() => setActiveTab('MovieReview')}
        >
          Movie Review
        </button>
        <button
          className={`tab ${activeTab === 'SignUp' ? 'active' : ''}`}
          onClick={() => setActiveTab('SignUp')}
        >
          Register
        </button>
        <button
          className={`tab ${activeTab === 'Login' ? 'active' : ''}`}
          onClick={() => setActiveTab('Login')}
        >
          Login
        </button>
      </nav>
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default App;
