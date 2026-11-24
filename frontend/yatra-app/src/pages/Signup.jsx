import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import PasswordRequirements, { isPasswordValid } from '../components/PasswordRequirements';
import Button from '../components/Button';
import Toast from '../components/Toast';
import '../styles/auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [statusNotice, setStatusNotice] = useState(null);
  const [toast, setToast] = useState(null);

  // Dynamic check for password match
  const doPasswordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;
  const isConfirmMismatched =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone Number
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\+?[0-9\s\-()]{7,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (min 7 digits).';
    }

    // Date of Birth
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required.';
    } else {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      if (isNaN(selectedDate.getTime()) || selectedDate >= today) {
        newErrors.dob = 'Please select a valid past date of birth.';
      }
    }

    // Password requirements
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password = 'Password does not satisfy all security requirements.';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusNotice(null);

    // Mark all as touched on submit
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      dob: true,
      password: true,
      confirmPassword: true,
    });

    if (validate()) {
      // Frontend-only confirmation message
      setStatusNotice({
        type: 'success',
        text: 'Account form validated successfully. Authentication will be connected later.',
      });

      setToast({
        title: 'Account Form Validated',
        message: 'Account form validated successfully. Authentication will be connected later.',
        type: 'success',
      });
    }
  };

  // Max date for DOB input (today)
  const todayStr = new Date().toISOString().split('T')[0];

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

        <div className="auth-container auth-container-wide">
          <div className="auth-card">
            <header className="auth-header">
              <div className="auth-badge">
                <span className="auth-badge-dot"></span>
                <span>Join Yatra Community</span>
              </div>
              <h1 className="auth-title">Create your Yatra account</h1>
              <p className="auth-subtitle">
                Create an account and start planning your next journey.
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
                id="signup-fullName"
                name="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First and last name"
                required
                autoComplete="name"
                error={errors.fullName}
              />

              <InputField
                id="signup-email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                required
                autoComplete="email"
                error={errors.email}
              />

              <div className="form-grid-2">
                <InputField
                  id="signup-phone"
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  required
                  autoComplete="tel"
                  error={errors.phone}
                />

                <InputField
                  id="signup-dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  max={todayStr}
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="bday"
                  error={errors.dob}
                />
              </div>

              {/* Password Field + Dynamic Indicator */}
              <PasswordField
                id="signup-password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                required
                autoComplete="new-password"
                error={errors.password}
              />

              <PasswordRequirements password={formData.password} />

              {/* Confirm Password Field */}
              <PasswordField
                id="signup-confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Re-enter your password"
                required
                autoComplete="new-password"
                error={
                  errors.confirmPassword ||
                  (isConfirmMismatched ? 'Passwords do not match.' : '')
                }
                success={doPasswordsMatch ? 'Passwords match.' : ''}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="auth-submit-btn"
              >
                Create Account
              </Button>

              <footer className="auth-card-footer">
                <span>Already have an account?</span>
                <Link to="/login" className="auth-switch-link">
                  Login
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
