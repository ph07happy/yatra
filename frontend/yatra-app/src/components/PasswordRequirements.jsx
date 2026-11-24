import React from 'react';

/**
 * Validates password rules. Exported helper function for reuse.
 */
export function checkPasswordStrength(password = '') {
  return {
    hasLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

export function isPasswordValid(password = '') {
  const reqs = checkPasswordStrength(password);
  return reqs.hasLength && reqs.hasUpper && reqs.hasLower && reqs.hasNumber && reqs.hasSpecial;
}

/**
 * Visual Checklist of Password Requirements.
 */
export default function PasswordRequirements({ password = '' }) {
  const reqs = checkPasswordStrength(password);

  const rules = [
    { key: 'hasLength', label: 'At least 8 characters', satisfied: reqs.hasLength },
    { key: 'hasUpper', label: 'One uppercase letter (A-Z)', satisfied: reqs.hasUpper },
    { key: 'hasLower', label: 'One lowercase letter (a-z)', satisfied: reqs.hasLower },
    { key: 'hasNumber', label: 'One number (0-9)', satisfied: reqs.hasNumber },
    { key: 'hasSpecial', label: 'One special character (!@#$%^&*)', satisfied: reqs.hasSpecial },
  ];

  return (
    <div className="password-requirements" aria-live="polite">
      <div className="requirements-title">Password Requirements</div>
      <ul className="requirements-list">
        {rules.map((rule) => (
          <li
            key={rule.key}
            className={`requirement-item ${rule.satisfied ? 'satisfied' : ''}`}
          >
            <span className="req-icon" aria-hidden="true">
              {rule.satisfied ? '✓' : '○'}
            </span>
            <span>{rule.label}</span>
            <span className="visually-hidden">
              {rule.satisfied ? '(satisfied)' : '(not satisfied)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
