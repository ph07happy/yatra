import React, { useEffect } from 'react';

/**
 * Accessible Toast notification.
 */
export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 4500);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const typeClass = toast.type === 'success' ? 'toast-success' : 'toast-info';

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      <div className={`toast ${typeClass}`} role="alert">
        <div className="toast-icon" aria-hidden="true">
          {toast.type === 'success' ? '✓' : 'ℹ'}
        </div>
        <div className="toast-content">
          <div className="toast-title">{toast.title}</div>
          <div className="toast-msg">{toast.message}</div>
        </div>
        <button
          type="button"
          className="toast-close"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
