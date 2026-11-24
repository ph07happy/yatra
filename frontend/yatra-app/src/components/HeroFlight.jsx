import React, { useRef, useEffect } from 'react';

/**
 * HeroFlight Component
 * High-performance vector kinematic flight tracking engine.
 * Computes coordinate scaling and forward/backward tangent lookaheads
 * so the plane precisely follows the path curvature and aligns tangent to velocity.
 */
export default function HeroFlight({ heroRef }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const routeSvg = svgRef.current;
    const routePath = pathRef.current;
    const plane = planeRef.current;
    const hero = heroRef ? heroRef.current : routeSvg?.parentElement;

    if (!routeSvg || !routePath || !plane) return;

    // Accessibility: Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      plane.style.display = 'none';
      return;
    }

    const DURATION = 14000; // 14 seconds per flight
    const LOOK_AHEAD = 6;   // Lookahead delta in svg path units
    const FADE_IN = 0.04;   // First 4% fade in
    const FADE_OUT = 0.06;  // Last 6% fade out

    const VIEWBOX_WIDTH = 1440;
    const VIEWBOX_HEIGHT = 520;
    const totalLength = routePath.getTotalLength();

    let scaleX = 1;
    let scaleY = 1;
    let startTime = null;
    let rafId = 0;
    let isIntersecting = true;

    function measure() {
      const rect = routeSvg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        scaleX = rect.width / VIEWBOX_WIDTH;
        scaleY = rect.height / VIEWBOX_HEIGHT;
      }
    }

    function place(progress) {
      const dist = progress * totalLength;
      const point = routePath.getPointAtLength(dist);
      const behind = routePath.getPointAtLength(Math.max(dist - LOOK_AHEAD, 0));
      const ahead = routePath.getPointAtLength(Math.min(dist + LOOK_AHEAD, totalLength));

      // Calculate tangent angle considering responsive non-uniform scale
      const deltaX = (ahead.x - behind.x) * scaleX;
      const deltaY = (ahead.y - behind.y) * scaleY;
      const heading = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Center exactly on path line and rotate nose tangent to path
      plane.style.transform = `translate(${point.x * scaleX}px, ${point.y * scaleY}px) translate(-50%, -50%) rotate(${heading + 90}deg)`;

      // Smooth fade-in and fade-out at path extremities
      let opacity = 1;
      if (progress < FADE_IN) {
        opacity = progress / FADE_IN;
      } else if (progress > 1 - FADE_OUT) {
        opacity = (1 - progress) / FADE_OUT;
      }
      plane.style.opacity = String(opacity);
    }

    function frame(now) {
      if (!isIntersecting) return;
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % DURATION;
      place(elapsed / DURATION);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId) return;
      startTime = null;
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    measure();

    // ResizeObserver ensures scaleX and scaleY remain accurate across window resizes
    let resizeObserver = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(routeSvg);
    } else {
      window.addEventListener('resize', measure);
    }

    // IntersectionObserver pauses RAF animation when hero is offscreen
    let intersectionObserver = null;
    const targetObs = hero || routeSvg;
    if ('IntersectionObserver' in window && targetObs) {
      intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          isIntersecting = true;
          start();
        } else {
          isIntersecting = false;
          stop();
        }
      });
      intersectionObserver.observe(targetObs);
    } else {
      start();
    }

    return () => {
      stop();
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', measure);
      if (intersectionObserver) intersectionObserver.disconnect();
    };
  }, [heroRef]);

  return (
    <>
      {/* Flight Trajectory Path */}
      <svg
        ref={svgRef}
        className="flight-route"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M-40 300 C 250 120, 520 330, 900 130 S 1300 60, 1500 90"
        />
      </svg>

      {/* Flight Airplane Centered On Path */}
      <div ref={planeRef} className="flight-plane" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
    </>
  );
}
