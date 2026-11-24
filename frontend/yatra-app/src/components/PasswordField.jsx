import React, { useState } from 'react';

/**
 * Accessible PasswordField with integrated Show/Hide toggle.
 */
export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  success = '',
  autoComplete = 'current-password',
  className = '',
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = error ? `${id}-error` : undefined;
  const successId = success ? `${id}-success` : undefined;

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`form-group ${className}`.trim()}>
      <label htmlFor={id} className="form-label">
        <span>{label}</span>
      </label>
      <div className="password-wrapper">
        <input
          id={id}
          name={name || id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId || successId}
          className={`form-input password-input ${error ? 'has-error' : ''} ${success ? 'has-success' : ''}`.trim()}
          {...rest}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="password-toggle-btn"
          aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            /* Eye Off SVG */
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            /* Eye SVG */
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="form-error" id={errorId} role="alert">
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </p>
      )}
      {!error && success && (
        <p className="form-success-note" id={successId}>
          <span aria-hidden="true">✓</span>
          <span>{success}</span>
        </p>
      )}
    </div>
  );
}
