import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AccessibleTabs } from './AccessibleTabs';


const sampleTabs = [
  { label: 'Tab 1', content: <div>Content 1</div> },
  { label: 'Tab 2', content: <div>Content 2</div> },
  { label: 'Tab 3', content: <div>Content 3</div> },
];

describe('AccessibleTabs', () => {
  it('must render all tabs', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);
    expect(screen.getByText('Tab 1')).toBeTruthy();
    expect(screen.getByText('Tab 2')).toBeTruthy();
    expect(screen.getByText('Tab 3')).toBeTruthy();
  });

  it('must comply with basic accessibility rules', async () => {
    const { container } = render(<AccessibleTabs tabs={sampleTabs} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('must show first tab content by default', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('must hide other tab contents by default', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);
    const tab2Content = screen.getByText('Content 2');
    const tab3Content = screen.getByText('Content 3');
    expect(tab2Content.parentElement).toHaveAttribute('hidden');
    expect(tab3Content.parentElement).toHaveAttribute('hidden');
  });

  it('must switch tabs on click', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);

    const tab2 = screen.getByText('Tab 2');
    fireEvent.click(tab2);

    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.getByText('Content 1').parentElement).toHaveAttribute('hidden');
  });

  it('must call onChange when tab changes', () => {
    const handleChange = vi.fn();
    render(<AccessibleTabs tabs={sampleTabs} onChange={handleChange} />);

    const tab2 = screen.getByText('Tab 2');
    fireEvent.click(tab2);

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ index: 1 }));
  });

  it('must navigate tabs with arrow keys', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);

    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });

    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('must navigate to last tab with End key', () => {
    render(<AccessibleTabs tabs={sampleTabs} />);

    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'End' });

    expect(screen.getByText('Content 3')).toBeVisible();
  });

  it('must navigate to first tab with Home key', () => {
    render(<AccessibleTabs tabs={sampleTabs} defaultActiveTab={2} />);

    const tab3 = screen.getByText('Tab 3');
    fireEvent.keyDown(tab3, { key: 'Home' });

    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('must have correct ARIA attributes', () => {
    render(<AccessibleTabs tabs={sampleTabs} ariaLabel="Test Tabs" />);

    const tablist = screen.getByRole('tablist');
    expect(tablist.getAttribute('aria-label')).toBe('Test Tabs');

    const tab1 = screen.getByText('Tab 1');
    expect(tab1.getAttribute('aria-selected')).toBe('true');
    expect(tab1.getAttribute('tabindex')).toBe('0');

    const tab2 = screen.getByText('Tab 2');
    expect(tab2.getAttribute('aria-selected')).toBe('false');
    expect(tab2.getAttribute('tabindex')).toBe('-1');
  });

});
