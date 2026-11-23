/**
 * Yatra — AI Trip Planner
 * Master Frontend Script (script.js)
 * Clean, modern vanilla JavaScript handling page interactions,
 * accessibility, and placeholder workflows.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DOM Elements
  // =========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const loginBtn = document.getElementById('login-btn');
  const heroPlanBtn = document.getElementById('hero-plan-btn');
  const planNavLink = document.getElementById('plan-nav-link');
  const destinationCards = document.querySelectorAll('.destination-card');
  const toastContainer = document.getElementById('toast-container');

  // =========================================================================
  // 2. Accessible Toast Notification System
  // =========================================================================
  let toastTimeout = null;

  /**
   * Displays an accessible, dismissible toast notification.
   * @param {string} title - Heading for the notification
   * @param {string} message - Body text explaining the action
   * @param {number} [duration=4500] - Duration in ms before auto-dismissal
   */
  function showToast(title, message, duration = 4500) {
    if (!toastContainer) return;

    // Remove any existing toast smoothly
    const existingToast = toastContainer.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
      if (toastTimeout) clearTimeout(toastTimeout);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    toast.innerHTML = `
      <div class="toast-icon" aria-hidden="true">&#9432;</div>
      <div class="toast-content">
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-msg">${escapeHTML(message)}</div>
      </div>
      <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => dismissToast(toast));

    toastContainer.appendChild(toast);

    toastTimeout = setTimeout(() => {
      dismissToast(toast);
    }, duration);
  }

  function dismissToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('toast-hiding');
    toast.addEventListener('animationend', () => {
      if (toast.parentNode) toast.remove();
    }, { once: true });
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 3. Navigation & Mobile Menu Behavior
  // =========================================================================
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', event => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 4. Scroll Behavior & Active Link Highlighting
  // =========================================================================
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    const destinationsSection = document.getElementById('destinations');

    if (destinationsSection) {
      const destTop = destinationsSection.offsetTop;
      const destHeight = destinationsSection.offsetHeight;

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#destinations') {
          if (scrollPos >= destTop && scrollPos < destTop + destHeight) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        } else if (href === '#top') {
          if (scrollPos < destTop) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // =========================================================================
  // 5. Placeholder Handlers for Future Modules
  // =========================================================================

  // Login Button Handler
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      showToast(
        'Login Coming Soon',
        'Authentication module is under development. Secure sign-in will be available in the next release.'
      );
    });
  }

  // Plan a Trip Button Handler (Hero)
  if (heroPlanBtn) {
    heroPlanBtn.addEventListener('click', () => {
      const destSection = document.getElementById('destinations');
      if (destSection) {
        destSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(
        'AI Planner Coming Soon',
        'Select a destination below to preview. The intelligent journey generator will be available soon!'
      );
    });
  }

  // Plan a Trip Nav Link Handler
  if (planNavLink) {
    planNavLink.addEventListener('click', (e) => {
      // Allow default smooth scroll to destinations, then announce status
      showToast(
        'AI Planner Coming Soon',
        'Explore our featured destinations below while the AI trip generator is being prepared.'
      );
    });
  }

  // Destination Card Click Handlers
  destinationCards.forEach(card => {
    const handleCardSelection = () => {
      const place = card.getAttribute('data-place') || 'this destination';
      showToast(
        `Exploring ${place}`,
        `AI trip itineraries for ${place} will be generated once the trip planning engine is active.`
      );
    };

    card.addEventListener('click', handleCardSelection);

    // Keyboard accessibility for interactive cards
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardSelection();
      }
    });
  });

})();
