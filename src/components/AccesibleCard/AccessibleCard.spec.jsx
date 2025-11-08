import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccessibleCard } from './AccessibleCard';

expect.extend(toHaveNoViolations);

describe('AccessibleCard', () => {
  it('must correctly render the card with title and content', () => {
    render(<AccessibleCard title="Test Card" content="Test Content" />);
    expect(screen.getByText('Test Card')).toBeTruthy();
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('must comply with basic accessibility rules', async () => {
    const { container } = render(<AccessibleCard title="Accessible Card" content="Content" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('must render as group role when not interactive', () => {
    render(<AccessibleCard title="Non-interactive" content="Content" />);
    const card = screen.getByRole('group');
    expect(card).toBeTruthy();
  });

  it('must render as button role when interactive', () => {
    render(<AccessibleCard title="Interactive" content="Content" interactive />);
    const card = screen.getByRole('button');
    expect(card).toBeTruthy();
  });

  it('must handle click events when interactive', () => {
    const handleInteraction = vi.fn();
    render(<AccessibleCard title="Click Test" content="Content" interactive onInteraction={handleInteraction} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleInteraction).toHaveBeenCalled();
  });

  it('must handle keyboard navigation (Enter key)', () => {
    const handleInteraction = vi.fn();
    render(<AccessibleCard title="Keyboard Test" content="Content" interactive onInteraction={handleInteraction} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(handleInteraction).toHaveBeenCalled();
  });

  it('must handle keyboard navigation (Space key)', () => {
    const handleInteraction = vi.fn();
    render(<AccessibleCard title="Keyboard Test" content="Content" interactive onInteraction={handleInteraction} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });

    expect(handleInteraction).toHaveBeenCalled();
  });

  it('must not trigger interactions when disabled', () => {
    const handleInteraction = vi.fn();
    render(<AccessibleCard title="Disabled" content="Content" interactive disabled onInteraction={handleInteraction} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleInteraction).not.toHaveBeenCalled();
  });

  it('must have aria-disabled when disabled', () => {
    render(<AccessibleCard title="Disabled" content="Content" disabled />);
    const card = screen.getByRole('group');
    expect(card.getAttribute('aria-disabled')).toBe('true');
  });

  it('must support horizontal orientation', () => {
    render(<AccessibleCard title="Horizontal" content="Content" orientation="horizontal" />);
    const card = screen.getByRole('group');
    expect(card.className).toContain('card--horizontal');
  });

  it('must have minimum dimensions for tactile interaction', () => {
    render(<AccessibleCard title="Size Test" content="Content" />);
    const card = screen.getByRole('group');
    const styles = window.getComputedStyle(card);

    const minHeight = parseInt(styles.minHeight);
    const minWidth = parseInt(styles.minWidth);

    expect(minHeight).toBeGreaterThanOrEqual(44);
    expect(minWidth).toBeGreaterThanOrEqual(44);
  });
});
