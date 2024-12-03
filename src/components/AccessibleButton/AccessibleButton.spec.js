import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defineAccessibleButton } from './AccessibleButton';

expect.extend(toHaveNoViolations);

function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root no encontrado.');
  return root.shadowRoot.querySelector(selector);
}

describe('AccessibleButton', () => {
  let buttonElement;

  beforeAll(() => {
    defineAccessibleButton();
  });

  beforeEach(async () => {
    document.body.innerHTML = '';
    buttonElement = document.createElement('accessible-button');
    buttonElement.setAttribute('label', 'Hacer clic');
    document.body.appendChild(buttonElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('must correctly render the button with the specified label.', async () => {
    const button = queryShadowRoot(buttonElement, 'button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Hacer clic');
  });

  // Basic accessibility tests
  it('must comply with basic accessibility rules', async () => {
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  // Keyboard interaction tests
  it('must be keyboard accessible', async () => {
    const button = queryShadowRoot(buttonElement, 'button');
    button.focus();
    const shadowActiveElement = buttonElement.shadowRoot.activeElement;
    expect(shadowActiveElement).toBe(button);
  });

  it('must be activated with the Enter key', async () => {
    let clicked = false;
    buttonElement.addEventListener('button-click', () => clicked = true);
    
    const button = queryShadowRoot(buttonElement, 'button');
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    expect(clicked).toBe(true);
  });

  it('must be activated with the Space key', async () => {
    let clicked = false;
    buttonElement.addEventListener('button-click', () => clicked = true);
    
    const button = queryShadowRoot(buttonElement, 'button');
    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    
    expect(clicked).toBe(true);
  });

  // ARIA Attribute Tests
  it('must correctly handle the aria-label attribute', async () => {
    buttonElement.setAttribute('aria-label', 'Test button');
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    const button = queryShadowRoot(buttonElement, 'button');
    expect(button.getAttribute('aria-label')).toBe('Test button');
  });

  it('must correctly handle the disabled state', async () => {
    buttonElement.setAttribute('disabled', '');
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    const button = queryShadowRoot(buttonElement, 'button');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    
    let clicked = false;
    buttonElement.addEventListener('button-click', () => clicked = true);
    button.click();
    expect(clicked).toBe(false);
  });

  // ARIA role testing
  it('must correctly handle the expandable ARIA roles', async () => {
    buttonElement.setAttribute('aria-expanded', 'true');
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    const button = queryShadowRoot(buttonElement, 'button');
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('must correctly handle the ARIA roles pressable', async () => {
    buttonElement.setAttribute('aria-pressed', 'true');
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    const button = queryShadowRoot(buttonElement, 'button');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  // Tactile dimensional tests
  it('must have minimum dimensions for tactile interaction', async () => {
    const button = queryShadowRoot(buttonElement, 'button');
    const styles = window.getComputedStyle(button);
    
    const minHeight = parseInt(styles.minHeight);
    const minWidth = parseInt(styles.minWidth);
    
    expect(minHeight).toBeGreaterThanOrEqual(44);
    expect(minWidth).toBeGreaterThanOrEqual(44);
  });

  // Customised event tests
  it('should issue personalised events with details', async () => {
    let eventDetail = null;
    buttonElement.addEventListener('button-click', (e) => {
      eventDetail = e.detail;
    });
    
    const button = queryShadowRoot(buttonElement, 'button');
    button.click();
    
    expect(eventDetail).toBeTruthy();
    expect(eventDetail.timestamp instanceof Date).toBe(true);
  });
});