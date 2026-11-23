(function () {
  'use strict';

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionLinks = document.querySelectorAll('.nav-link[data-section]');
  const loginBtn = document.getElementById('login-btn');
  const heroPlanBtn = document.getElementById('hero-plan-btn');
  const planNavLink = document.getElementById('plan-nav-link');
  const destinationCards = document.querySelectorAll('.destination-card');
  const toastContainer = document.getElementById('toast-container');

  let toastTimeout = null;

  function showToast(title, message, duration = 4500) {
    if (!toastContainer) return;

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

    toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));
    toastContainer.appendChild(toast);
    toastTimeout = setTimeout(() => dismissToast(toast), duration);
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

  function initFlight() {
    const routeSvg = document.querySelector('.flight-route');
    const routePath = routeSvg ? routeSvg.querySelector('path') : null;
    const plane = document.querySelector('.flight-plane');
    const hero = document.getElementById('hero');

    if (!routeSvg || !routePath || !plane || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const DURATION = 14000;
    const LOOK_AHEAD = 6;
    const FADE_IN = 0.04;
    const FADE_OUT = 0.06;

    const viewBox = routeSvg.viewBox.baseVal;
    const totalLength = routePath.getTotalLength();

    let scaleX = 1;
    let scaleY = 1;
    let startTime = null;
    let rafId = 0;

    function measure() {
      const rect = routeSvg.getBoundingClientRect();
      scaleX = rect.width / viewBox.width;
      scaleY = rect.height / viewBox.height;
    }

    function place(progress) {
      const dist = progress * totalLength;
      const point = routePath.getPointAtLength(dist);
      const behind = routePath.getPointAtLength(Math.max(dist - LOOK_AHEAD, 0));
      const ahead = routePath.getPointAtLength(Math.min(dist + LOOK_AHEAD, totalLength));

      const heading = Math.atan2(
        (ahead.y - behind.y) * scaleY,
        (ahead.x - behind.x) * scaleX
      ) * (180 / Math.PI);

      plane.style.transform =
        `translate(${point.x * scaleX}px, ${point.y * scaleY}px) translate(-50%, -50%) rotate(${heading + 90}deg)`;

      let opacity = 1;
      if (progress < FADE_IN) opacity = progress / FADE_IN;
      else if (progress > 1 - FADE_OUT) opacity = (1 - progress) / FADE_OUT;
      plane.style.opacity = String(opacity);
    }

    function frame(now) {
      if (startTime === null) startTime = now;
      place(((now - startTime) % DURATION) / DURATION);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId) return;
      startTime = null;
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    measure();

    if ('ResizeObserver' in window) {
      new ResizeObserver(measure).observe(routeSvg);
    } else {
      window.addEventListener('resize', measure);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries[0].isIntersecting ? start() : stop();
      }).observe(hero);
    } else {
      start();
    }
  }

  initFlight();

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

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

  function updateActiveNavLink() {
    const destinationsSection = document.getElementById('destinations');
    if (!destinationsSection) return;

    const scrollPos = window.scrollY + 120;
    const destTop = destinationsSection.offsetTop;
    const destBottom = destTop + destinationsSection.offsetHeight;

    let current = 'top';
    if (scrollPos >= destTop && scrollPos < destBottom) current = 'destinations';
    else if (scrollPos >= destBottom) current = null;

    sectionLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      showToast(
        'Login Coming Soon',
        'Authentication module is under development. Secure sign-in will be available in the next release.'
      );
    });
  }

  if (heroPlanBtn) {
    heroPlanBtn.addEventListener('click', () => {
      const destSection = document.getElementById('destinations');
      if (destSection) destSection.scrollIntoView({ behavior: 'smooth' });
      showToast(
        'AI Planner Coming Soon',
        'Select a destination below to preview. The intelligent journey generator will be available soon!'
      );
    });
  }

  if (planNavLink) {
    planNavLink.addEventListener('click', () => {
      showToast(
        'AI Planner Coming Soon',
        'Explore our featured destinations below while the AI trip generator is being prepared.'
      );
    });
  }

  destinationCards.forEach(card => {
    const handleCardSelection = () => {
      const place = card.getAttribute('data-place') || 'this destination';
      showToast(
        `Exploring ${place}`,
        `AI trip itineraries for ${place} will be generated once the trip planning engine is active.`
      );
    };

    card.addEventListener('click', handleCardSelection);

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardSelection();
      }
    });
  });
})();
