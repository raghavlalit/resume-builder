import { Link } from 'react-router-dom';
import { getSession, logoutUser } from '../utils/api';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [session, setSession] = useState(null);
  console.log(session);
  useEffect(() => {
    const userSession = getSession();
    setSession(userSession);
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#667eea"/>
                  <path d="M14 2V8H20" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1>EasyCVCraft</h1>
            </Link>
          </div>
          
          <nav className="nav">
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              {session?.isLoggedIn && (
                <li><Link to="/resume-builder">Resume Builder</Link></li>
              )}
            </ul>
          </nav>
          
          <div className="auth-buttons">
            {session?.isLoggedIn ? (
              <div className="user-menu">
                <span className="user-name">Welcome, {session.user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 