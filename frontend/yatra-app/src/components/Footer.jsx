import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Footer matching the Yatra visual identity.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="footer-brand" aria-label="Yatra Home">
          <span className="footer-logo">Yatra</span>
          <span className="footer-hindi">यात्रा</span>
        </Link>
        <p className="footer-tagline">AI-powered travel planning for smarter journeys.</p>
        <div className="footer-divider" aria-hidden="true"></div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Yatra. All rights reserved.</p>
          <p className="footer-note">
            Plans are AI-assisted suggestions. Please verify travel timings before departure.
          </p>
        </div>
      </div>
    </footer>
  );
}
