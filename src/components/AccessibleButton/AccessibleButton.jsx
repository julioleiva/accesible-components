import { useState, useRef, useEffect } from 'react';
import './AccessibleButton.css';

export const AccessibleButton = ({
  label = 'Button',
  disabled = false,
  type = 'button',
  ariaLabel,
  ariaExpanded,
  ariaPressed,
  ariaControls,
  onClick,
  className = '',
  ...props
}) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      aria-controls={ariaControls}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`accessible-button ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default AccessibleButton;
