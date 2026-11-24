import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Responsive Navigation Bar component with dynamic links based on route.
 */
export default function Navbar({ onPlanClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handlePlanClick = (e) => {
    closeMenu();
    if (onPlanClick) {
      onPlanClick(e);
    }
  };

  return (
    <nav className="navbar" id="navbar" aria-label="Main Navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu} aria-label="Yatra Home">
          <span className="brand-text">Yatra</span>
          <span className="brand-hindi">यात्रा</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

        <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`} id="nav-menu">
          <div className="nav-links">
            {isHome ? (
              <>
                <a href="#top" className="nav-link active" onClick={closeMenu}>
                  Home
                </a>
                <a href="#destinations" className="nav-link" onClick={closeMenu}>
                  Destinations
                </a>
                <a
                  href="#destinations"
                  className="nav-link"
                  onClick={handlePlanClick}
                  id="plan-nav-link"
                >
                  Plan a Trip
                </a>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Home
                </Link>
                <Link to="/#destinations" className="nav-link" onClick={closeMenu}>
                  Destinations
                </Link>
                <Link to="/#destinations" className="nav-link" onClick={closeMenu}>
                  Plan a Trip
                </Link>
              </>
            )}
          </div>

          <div className="nav-actions">
            {isLogin ? (
              <Link to="/signup" className="btn btn-login" onClick={closeMenu}>
                Sign Up
              </Link>
            ) : (
              <Link to="/login" className="btn btn-login" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
