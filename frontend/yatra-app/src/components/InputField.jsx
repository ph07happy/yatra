import React from 'react';

/**
 * Reusable Accessible InputField component.
 */
export default function InputField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  success = '',
  autoComplete,
  className = '',
  optional = false,
  min,
  max,
  ...rest
}) {
  const errorId = error ? `${id}-error` : undefined;
  const successId = success ? `${id}-success` : undefined;

  return (
    <div className={`form-group ${className}`.trim()}>
      <label htmlFor={id} className="form-label">
        <span>{label}</span>
        {optional && <span className="form-label-optional">(Optional)</span>}
      </label>
      <div className="input-wrapper">
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          min={min}
          max={max}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId || successId}
          className={`form-input ${error ? 'has-error' : ''} ${success ? 'has-success' : ''}`.trim()}
          {...rest}
        />
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
