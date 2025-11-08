import { useEffect, useRef, useState } from 'react';
import './AccessibleAlert.css';

const alertStyles = {
  info: {
    background: '#e8f4fd',
    color: '#004174',
    border: '#b3d7f4',
    icon: '💡'
  },
  success: {
    background: '#e8f8f0',
    color: '#0f5132',
    border: '#badbcc',
    icon: '✓'
  },
  warning: {
    background: '#fff8e6',
    color: '#664d03',
    border: '#ffecb5',
    icon: '⚠️'
  },
  error: {
    background: '#f8d7da',
    color: '#842029',
    border: '#f5c2c7',
    icon: '⚠'
  }
};

export const AccessibleAlert = ({
  message = 'Mensaje de alerta',
  description,
  type = 'info',
  icon: customIcon,
  dismissible = false,
  autoDismiss,
  title,
  live = 'polite',
  onDismiss,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const dismissTimeoutRef = useRef(null);

  const styles = alertStyles[type] || alertStyles.info;
  const icon = customIcon !== undefined ? customIcon : styles.icon;
  const alertRole = live === 'assertive' ? 'alertdialog' : 'alert';

  useEffect(() => {
    if (autoDismiss && !isNaN(parseInt(autoDismiss))) {
      dismissTimeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, parseInt(autoDismiss));
    }

    return () => {
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, [autoDismiss]);

  const handleDismiss = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (onDismiss) {
      onDismiss({ timestamp: new Date() });
    }

    if (prefersReducedMotion) {
      setIsVisible(false);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDismiss();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`alert alert--${type} ${isAnimating ? 'alert--dismissing' : ''} ${className}`}
      role={alertRole}
      aria-live={live}
      aria-atomic="true"
      style={{
        '--alert-background': styles.background,
        '--alert-color': styles.color,
        '--alert-border': styles.border
      }}
      {...props}
    >
      {icon && (
        <span className="alert-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="alert-content">
        {title && <h2 className="alert-title">{title}</h2>}
        <p className="alert-description">
          {description || message}
        </p>
      </div>
      {dismissible && (
        <button
          className="alert-dismiss"
          aria-label="Cerrar alerta"
          type="button"
          onClick={handleDismiss}
          onKeyDown={handleKeyDown}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AccessibleAlert;
