import React from 'react';

/**
 * Reusable Button component matching Yatra visual guidelines.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'login'
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ariaLabel,
  ...rest
}) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    login: 'btn-login',
  }[variant] || 'btn-primary';

  const fullClass = fullWidth ? 'btn-full' : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${fullClass} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
}
