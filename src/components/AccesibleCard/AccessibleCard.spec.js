import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defineAccessibleCard } from './AccessibleCard';

expect.extend(toHaveNoViolations);

function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root not found');
  return root.shadowRoot.querySelector(selector);
}

function getCleanText(element) {
  return element.textContent.trim();
}

describe('AccessibleCard', () => {
  let cardElement;
  let mainElement;

  beforeAll(() => {
    defineAccessibleCard();
  });

  beforeEach(async () => {
    document.body.innerHTML = '';
    mainElement = document.createElement('main');
    mainElement.setAttribute('role', 'main');
    document.body.appendChild(mainElement);
    
    cardElement = document.createElement('accessible-card');
    mainElement.appendChild(cardElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic rendering', () => {
    it('must render the component with default values', async () => {
      const title = queryShadowRoot(cardElement, '.card-title');
      const content = queryShadowRoot(cardElement, '.card-content');
      expect(getCleanText(title)).toBe('Título de la tarjeta');
      expect(getCleanText(content)).toBe('Contenido de la tarjeta');
    });

    it('must render with customised title and content', async () => {
      cardElement.setAttribute('title', 'Test Title');
      cardElement.setAttribute('content', 'Test Content');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const title = queryShadowRoot(cardElement, '.card-title');
      const content = queryShadowRoot(cardElement, '.card-content');
      expect(getCleanText(title)).toBe('Test Title');
      expect(getCleanText(content)).toBe('Test Content');
    });
  });

  describe('Accessibility', () => {
    it(`must comply with axe's basic rules`, async () => {
      const results = await axe(document.body, {
        rules: {
          region: { enabled: false }
        }
      });
      expect(results).toHaveNoViolations();
    });

    it('must have the default group role', async () => {
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('role')).toBe('group');
    });

    it('must have the role button when it is interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('role')).toBe('button');
    });

    it('must be focusable when interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Interactivity', () => {
    it('must emit event on click when interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      let eventFired = false;
      let eventDetail = null;
      cardElement.addEventListener('card-interaction', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const card = queryShadowRoot(cardElement, '.card');
      card.click();
      
      expect(eventFired).toBe(true);
      expect(eventDetail.type).toBe('click');
    });

    it('must respond to Enter when interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      let eventFired = false;
      cardElement.addEventListener('card-interaction', () => {
        eventFired = true;
      });
      
      const card = queryShadowRoot(cardElement, '.card');
      card.dispatchEvent(new KeyboardEvent('keydown', { 
        key: 'Enter',
        bubbles: true,
        cancelable: true 
      }));
      
      expect(eventFired).toBe(true);
    });

    it('must not emit events when disabled', async () => {
      cardElement.setAttribute('interactive', '');
      cardElement.setAttribute('disabled', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      let eventFired = false;
      cardElement.addEventListener('card-interaction', () => {
        eventFired = true;
      });
      
      const card = queryShadowRoot(cardElement, '.card');
      card.click();
      
      expect(eventFired).toBe(false);
    });
  });

  describe('States', () => {
    it('must handle the selected state', async () => {
      cardElement.setAttribute('interactive', '');
      cardElement.setAttribute('selected', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-selected')).toBe('true');
    });

    it('must handle the expanded state', async () => {
      cardElement.setAttribute('interactive', '');
      cardElement.setAttribute('expanded', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-expanded')).toBe('true');
    });

    it('must handle the disabled state', async () => {
      cardElement.setAttribute('disabled', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('Orientation', () => {
    it('should be vertical by default', async () => {
      const card = queryShadowRoot(cardElement, '.card');
      const styles = window.getComputedStyle(card);
      expect(styles.flexDirection).toBe('column');
    });

    it('must change to horizontal when specifying', async () => {
      cardElement.setAttribute('orientation', 'horizontal');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      const styles = window.getComputedStyle(card);
      expect(styles.flexDirection).toBe('row');
      expect(card.getAttribute('aria-orientation')).toBe('horizontal');
    });
  });
});