import { useState, useId } from 'react';
import './AccessibleCard.css';

export const AccessibleCard = ({
  title = 'Título de la tarjeta',
  content = 'Contenido de la tarjeta',
  interactive = false,
  expanded: initialExpanded = false,
  selected: initialSelected = false,
  disabled = false,
  orientation = 'vertical',
  onInteraction,
  children,
  className = '',
  ...props
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [selected, setSelected] = useState(initialSelected);
  const uniqueId = useId();

  const isInteractive = interactive || initialExpanded !== false || initialSelected !== false;

  const handleInteraction = (event) => {
    if (disabled) return;

    const newExpanded = initialExpanded !== false ? !expanded : expanded;
    const newSelected = initialSelected !== false ? !selected : selected;

    if (initialExpanded !== false) setExpanded(newExpanded);
    if (initialSelected !== false) setSelected(newSelected);

    if (onInteraction) {
      onInteraction({
        type: event.type,
        expanded: newExpanded,
        selected: newSelected,
        timestamp: new Date()
      });
    }
  };

  const handleClick = (event) => {
    if (!disabled) {
      event.preventDefault();
      handleInteraction(event);
    }
  };

  const handleKeydown = (event) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleInteraction(event);
    }
  };

  return (
    <section
      className={`card card--${orientation} ${className}`}
      role={isInteractive ? 'button' : 'group'}
      aria-labelledby={`title-${uniqueId}`}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-expanded={initialExpanded !== false ? expanded : undefined}
      aria-selected={initialSelected !== false ? selected : undefined}
      aria-orientation={orientation === 'horizontal' ? 'horizontal' : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeydown : undefined}
      {...props}
    >
      <h3 id={`title-${uniqueId}`} className="card-title">{title}</h3>
      <p className="card-content">{content}</p>
      {children}
    </section>
  );
};

export default AccessibleCard;
