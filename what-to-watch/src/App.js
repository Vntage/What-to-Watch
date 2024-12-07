import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Quiz from './components/Quiz';
import MovieRecommendations from './components/MovieRecommendations';
import MovieReview from './components/MovieReview';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import SubscriptionManager from './components/SubscriptionManager';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/MovieRecommendations" element={<MovieRecommendations />} />
            <Route path="/MovieReview" element={<MovieReview />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path ="/SubscriptionManager" element={<SubscriptionManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavBar = location.pathname === '/Login' || location.pathname === '/SignUp';

  if(hideNavBar) {
    return null;
  }

  const tabs = [
    { name: 'Home', path: '/Home' },
    { name: 'About', path: '/About' },
    { name: 'Movie Recommendations', path: '/MovieRecommendations' },
    { name: 'Contact', path: '/Contact' },
    { name: 'Quiz', path: '/Quiz' },
    { name: 'Movie Review', path: '/MovieReview' },
    { name: 'My Account', path: '/MyAccount' },
    { name: 'Manage Subscriptions', path: '/SubscriptionManager'}
  ];

  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className="tab"
          onClick={() => navigate(tab.path)}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  );
};

export default App;
