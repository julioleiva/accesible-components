import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AccessibleButton } from './AccessibleButton';

describe('AccessibleButton', () => {
  it('must correctly render the button with the specified label.', () => {
    render(<AccessibleButton label="Hacer clic" />);
    const button = screen.getByRole('button', { name: /hacer clic/i });
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Hacer clic');
  });

  // Basic accessibility tests
  it('must comply with basic accessibility rules', async () => {
    const { container } = render(<AccessibleButton label="Test Button" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Keyboard interaction tests
  it('must be keyboard accessible', () => {
    render(<AccessibleButton label="Keyboard Test" />);
    const button = screen.getByRole('button');
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('must be activated with the Enter key', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton label="Enter Test" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalled();
  });

  it('must be activated with the Space key', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton label="Space Test" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });

    expect(handleClick).toHaveBeenCalled();
  });

  // ARIA Attribute Tests
  it('must correctly handle the aria-label attribute', () => {
    render(<AccessibleButton label="Button" ariaLabel="Test button" />);
    const button = screen.getByRole('button', { name: 'Test button' });
    expect(button.getAttribute('aria-label')).toBe('Test button');
  });

  it('must correctly handle the disabled state', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton label="Disabled Test" disabled onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.getAttribute('aria-disabled')).toBe('true');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ARIA role testing
  it('must correctly handle the expandable ARIA roles', () => {
    render(<AccessibleButton label="Expand" ariaExpanded={true} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('must correctly handle the ARIA roles pressable', () => {
    render(<AccessibleButton label="Press" ariaPressed={true} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });


  // Click event tests
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton label="Click Test" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
