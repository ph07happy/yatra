import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import '../styles/home.css';

const DESTINATIONS = [
  {
    id: 'manali',
    place: 'Manali, Himachal Pradesh',
    title: 'Manali',
    desc: 'Snow peaks and pine valleys',
    state: 'Himachal Pradesh',
    pill: 'Himalayas',
    image: '/assets/images/manali.svg',
    alt: 'Manali snow peaks and pine valleys',
  },
  {
    id: 'goa',
    place: 'Goa',
    title: 'Goa',
    desc: 'Sunsets, shacks and sea',
    state: 'West Coast',
    pill: 'Coastal',
    image: '/assets/images/goa.svg',
    alt: 'Goa sunset beach and palm trees',
  },
  {
    id: 'jaipur',
    place: 'Jaipur, Rajasthan',
    title: 'Jaipur',
    desc: 'Forts, bazaars and pink walls',
    state: 'Rajasthan',
    pill: 'Heritage',
    image: '/assets/images/jaipur.svg',
    alt: 'Jaipur pink palaces and historic forts',
  },
  {
    id: 'alleppey',
    place: 'Alleppey, Kerala',
    title: 'Alleppey',
    desc: 'Backwaters by houseboat',
    state: 'Kerala',
    pill: 'Backwaters',
    image: '/assets/images/alleppey.svg',
    alt: 'Alleppey backwaters and traditional houseboat',
  },
];

export default function Home() {
  const [toast, setToast] = useState(null);

  const handlePlanClick = () => {
    const destSection = document.getElementById('destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
    setToast({
      title: 'AI Planner Coming Soon',
      message: 'Explore our featured destinations below while the intelligent journey generator is being prepared.',
      type: 'info',
    });
  };

  const handleCardClick = (dest) => {
    setToast({
      title: `Exploring ${dest.title}`,
      message: `AI trip itineraries for ${dest.place} will be generated once the trip planning engine is active.`,
      type: 'info',
    });
  };

  const handleCardKeyDown = (e, dest) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(dest);
    }
  };

  return (
    <div className="home-page">
      {/* ==================== HERO SECTION ==================== */}
      <header className="hero" id="hero">
        {/* Flight Trajectory */}
        <svg
          className="flight-route"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-40 300 C 250 120, 520 330, 900 130 S 1300 60, 1500 90" />
        </svg>

        {/* Flight Airplane */}
        <div className="flight-plane" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>

        {/* Glowing Sun and Moon */}
        <div className="sun" aria-hidden="true"></div>
        <div className="moon" aria-hidden="true"></div>

        {/* Hero Content */}
        <div className="hero-inner">
          <h1 className="hero-title">Yatra</h1>
          <p className="hero-deva" lang="hi">यात्रा</p>
          <p className="hero-tag">
            Your AI trip planner. Say where, get a journey built around you.
          </p>
          <div className="hero-cta-group">
            <a href="#destinations" className="btn btn-secondary">
              Explore Destinations
            </a>
            <button
              type="button"
              className="btn btn-primary"
              id="hero-plan-btn"
              onClick={handlePlanClick}
            >
              Plan a Trip
            </button>
          </div>
        </div>

        {/* Mountains Silhouette */}
        <svg
          className="mountains"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#5b3a86"
            opacity="0.75"
            d="M0 150 L140 70 L250 130 L380 40 L520 140 L640 80 L780 150 L930 50 L1070 135 L1200 75 L1330 130 L1440 90 V220 H0Z"
          />
          <path
            fill="#2f2d6b"
            d="M0 190 L160 120 L300 175 L460 105 L620 180 L760 130 L920 185 L1080 115 L1240 180 L1440 130 V220 H0Z"
          />
          <path
            fill="#f7f5fb"
            d="M0 215 L200 170 L420 205 L640 175 L860 208 L1100 172 L1300 205 L1440 185 V220 H0Z"
          />
        </svg>
      </header>

      {/* ==================== NAVIGATION BAR ==================== */}
      <Navbar onPlanClick={handlePlanClick} />

      {/* ==================== MAIN CONTENT ==================== */}
      <main id="main-content">
        <section
          className="destinations-section"
          id="destinations"
          aria-labelledby="destinations-heading"
        >
          <div className="section-header">
            <h2 className="section-title" id="destinations-heading">
              Where will you go?
            </h2>
            <p className="section-sub">
              Turn your dream escapes into personalized, day-by-day itineraries.
            </p>
          </div>

          {/* Destination Cards Grid (4 desktop, 2 tablet, 1 mobile) */}
          <div className="destinations-grid">
            {DESTINATIONS.map((dest) => (
              <article
                key={dest.id}
                className="destination-card"
                data-place={dest.place}
                tabIndex={0}
                role="button"
                aria-label={`Plan trip to ${dest.title}`}
                onClick={() => handleCardClick(dest)}
                onKeyDown={(e) => handleCardKeyDown(e, dest)}
              >
                <div className="card-visual">
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    width="300"
                    height="200"
                    loading="lazy"
                  />
                  <span className="card-pill">{dest.pill}</span>
                </div>
                <div className="card-meta">
                  <div className="card-text">
                    <h3 className="card-title">{dest.title}</h3>
                    <p className="card-desc">{dest.desc}</p>
                  </div>
                  <div className="card-footer">
                    <span className="card-state">{dest.state}</span>
                    <span className="card-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <Footer />

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
