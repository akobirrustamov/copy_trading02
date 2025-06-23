import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header({ props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-text">HOME</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
              <Link
                to="/admins"
                className={`nav-link ${props === 'admins' ? 'active' : ''}`}
              >
                Admins
              </Link>
            </li>
            <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
              <Link
                to="/users"
                className={`nav-link ${props === 'users' ? 'active' : ''}`}
              >
                Users
              </Link>
            </li>
            <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
              <Link
                to="/traders"
                className={`nav-link ${props === 'traders' ? 'active' : ''}`}
              >
                Traders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;