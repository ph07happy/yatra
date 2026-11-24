import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import Button from '../components/Button';
import Toast from '../components/Toast';
import '../styles/auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [statusNotice, setStatusNotice] = useState(null);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation (required only for login, not strength rules)
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusNotice(null);

    if (validate()) {
      // Frontend-only confirmation message
      setStatusNotice({
        type: 'success',
        text: 'Login form validated successfully. Authentication will be connected later.',
      });

      setToast({
        title: 'Form Validated',
        message: 'Login form validated successfully. Authentication will be connected later.',
        type: 'success',
      });
    }
  };

  const handleForgotPassword = () => {
    setStatusNotice({
      type: 'info',
      text: 'Password recovery will be available after authentication is connected.',
    });
    setToast({
      title: 'Password Recovery',
      message: 'Password recovery will be available after authentication is connected.',
      type: 'info',
    });
  };

  return (
    <div className="auth-layout">
      <Navbar />

      <main className="auth-page">
        {/* Subtle background decoration */}
        <div className="auth-bg-deco" aria-hidden="true">
          <div className="auth-sun"></div>
          <svg
            className="auth-mountains"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
          >
            <path
              fill="#5b3a86"
              opacity="0.45"
              d="M0 150 L140 70 L250 130 L380 40 L520 140 L640 80 L780 150 L930 50 L1070 135 L1200 75 L1330 130 L1440 90 V220 H0Z"
            />
            <path
              fill="#2f2d6b"
              opacity="0.65"
              d="M0 190 L160 120 L300 175 L460 105 L620 180 L760 130 L920 185 L1080 115 L1240 180 L1440 130 V220 H0Z"
            />
            <path
              fill="#f7f5fb"
              d="M0 215 L200 170 L420 205 L640 175 L860 208 L1100 172 L1300 205 L1440 185 V220 H0Z"
            />
          </svg>
        </div>

        <div className="auth-container">
          <div className="auth-card">
            <header className="auth-header">
              <div className="auth-badge">
                <span className="auth-badge-dot"></span>
                <span>Yatra Member Sign In</span>
              </div>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">
                Sign in to continue your journey with Yatra.
              </p>
            </header>

            {statusNotice && (
              <div
                className={`auth-notice ${
                  statusNotice.type === 'success'
                    ? 'auth-notice-success'
                    : 'auth-notice-info'
                }`}
                role="status"
              >
                <span className="auth-notice-icon" aria-hidden="true">
                  {statusNotice.type === 'success' ? '✓' : 'ℹ'}
                </span>
                <span>{statusNotice.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <InputField
                id="login-email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                error={errors.email}
              />

              <PasswordField
                id="login-password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                error={errors.password}
              />

              <div className="auth-extra-row">
                <button
                  type="button"
                  className="btn-forgot"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="auth-submit-btn"
              >
                Sign In
              </Button>

              <footer className="auth-card-footer">
                <span>Don't have an account?</span>
                <Link to="/signup" className="auth-switch-link">
                  Create an account
                </Link>
              </footer>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
