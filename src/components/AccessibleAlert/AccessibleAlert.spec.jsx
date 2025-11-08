import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AccessibleAlert } from './AccessibleAlert';


describe('AccessibleAlert', () => {
  it('must render with default message', () => {
    render(<AccessibleAlert />);
    expect(screen.getByText('Mensaje de alerta')).toBeTruthy();
  });

  it('must render with custom message', () => {
    render(<AccessibleAlert message="Custom alert message" />);
    expect(screen.getByText('Custom alert message')).toBeTruthy();
  });

  it('must comply with basic accessibility rules', async () => {
    const { container } = render(<AccessibleAlert message="Test alert" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('must render different alert types', () => {
    const { rerender } = render(<AccessibleAlert type="info" message="Info" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--info');

    rerender(<AccessibleAlert type="success" message="Success" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--success');

    rerender(<AccessibleAlert type="warning" message="Warning" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--warning');

    rerender(<AccessibleAlert type="error" message="Error" />);
    expect(screen.getByRole('alert')).toHaveClass('alert--error');
  });

  it('must render with title', () => {
    render(<AccessibleAlert title="Alert Title" message="Alert message" />);
    expect(screen.getByText('Alert Title')).toBeTruthy();
  });

  it('must render dismiss button when dismissible', () => {
    render(<AccessibleAlert message="Dismissible alert" dismissible />);
    const dismissButton = screen.getByLabelText('Cerrar alerta');
    expect(dismissButton).toBeTruthy();
  });

  it('must call onDismiss when dismiss button clicked', () => {
    const handleDismiss = vi.fn();
    render(<AccessibleAlert message="Test" dismissible onDismiss={handleDismiss} />);

    const dismissButton = screen.getByLabelText('Cerrar alerta');
    fireEvent.click(dismissButton);

    expect(handleDismiss).toHaveBeenCalled();
  });

  it('must dismiss on Enter key', () => {
    const handleDismiss = vi.fn();
    render(<AccessibleAlert message="Test" dismissible onDismiss={handleDismiss} />);

    const dismissButton = screen.getByLabelText('Cerrar alerta');
    fireEvent.keyDown(dismissButton, { key: 'Enter' });

    expect(handleDismiss).toHaveBeenCalled();
  });

  it('must dismiss on Space key', () => {
    const handleDismiss = vi.fn();
    render(<AccessibleAlert message="Test" dismissible onDismiss={handleDismiss} />);

    const dismissButton = screen.getByLabelText('Cerrar alerta');
    fireEvent.keyDown(dismissButton, { key: ' ' });

    expect(handleDismiss).toHaveBeenCalled();
  });

  it('must auto-dismiss after specified time', async () => {
    const handleDismiss = vi.fn();
    render(<AccessibleAlert message="Auto dismiss" autoDismiss={100} onDismiss={handleDismiss} />);

    await waitFor(() => expect(handleDismiss).toHaveBeenCalled(), { timeout: 200 });
  });

  it('must render custom icon', () => {
    render(<AccessibleAlert message="Custom icon" icon="🎉" />);
    expect(screen.getByText('🎉')).toBeTruthy();
  });

  it('must have correct ARIA attributes', () => {
    render(<AccessibleAlert message="Test" live="assertive" />);
    const alert = screen.getByRole('alertdialog');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(alert.getAttribute('aria-atomic')).toBe('true');
  });
});
