import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import HeroFlight from '../components/HeroFlight';
import CelestialBackground from '../components/CelestialBackground';
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
  const heroRef = useRef(null);

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
      <header ref={heroRef} className="hero" id="hero">
        {/* Kinematic Flight Path & Animated Airplane */}
        <HeroFlight heroRef={heroRef} />

        {/* Synchronized 23s Celestial Cycle (Sun, Moon & Mountain Shadows) */}
        <CelestialBackground />

        {/* Hero Content */}
        <div className="hero-inner">
          <div className="brand-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            <span>Next-Generation Travel AI</span>
          </div>
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

      {/* Accessible Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
