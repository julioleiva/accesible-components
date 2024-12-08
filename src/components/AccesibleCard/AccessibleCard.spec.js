import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe'; // Tools for accessibility testing
import { defineAccessibleCard } from './AccessibleCard'; // Import the component definition

expect.extend(toHaveNoViolations); // Extend Jest's assertions with accessibility checks

// Helper function to query the shadow DOM of an element
function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root not found'); // Ensure the shadow root exists
  return root.shadowRoot.querySelector(selector); // Return the queried element
}

// Helper function to trim and clean text content from an element
function getCleanText(element) {
  return element.textContent.trim();
}

// Main test suite for the AccessibleCard component
describe('AccessibleCard', () => {
  let cardElement; // Variable to hold the card instance
  let mainElement; // Variable to hold the main container for testing

  // Runs once before all tests in the suite to define the custom element
  beforeAll(() => {
    defineAccessibleCard();
  });

  // Runs before each test to set up a clean DOM environment
  beforeEach(async () => {
    document.body.innerHTML = ''; // Clear the document body
    mainElement = document.createElement('main'); // Create a main container
    mainElement.setAttribute('role', 'main'); // Add ARIA role to the main container
    document.body.appendChild(mainElement); // Append the main container to the DOM
    
    cardElement = document.createElement('accessible-card'); // Create an instance of the card
    mainElement.appendChild(cardElement); // Append the card to the main container
    await new Promise(resolve => requestAnimationFrame(resolve)); // Wait for rendering
  });

  // Runs after each test to reset the DOM environment
  afterEach(() => {
    document.body.innerHTML = ''; // Clear the document body
  });

  // Group for testing basic rendering
  describe('Basic rendering', () => {
    // Test: Default rendering of the card
    it('must render the component with default values', async () => {
      const title = queryShadowRoot(cardElement, '.card-title'); // Query the title element
      const content = queryShadowRoot(cardElement, '.card-content'); // Query the content element
      expect(getCleanText(title)).toBe('Título de la tarjeta'); // Check default title
      expect(getCleanText(content)).toBe('Contenido de la tarjeta'); // Check default content
    });

    // Test: Rendering with customized title and content
    it('must render with customised title and content', async () => {
      cardElement.setAttribute('title', 'Test Title'); // Set a custom title
      cardElement.setAttribute('content', 'Test Content'); // Set custom content
      await new Promise(resolve => requestAnimationFrame(resolve)); // Wait for rendering
      
      const title = queryShadowRoot(cardElement, '.card-title');
      const content = queryShadowRoot(cardElement, '.card-content');
      expect(getCleanText(title)).toBe('Test Title'); // Verify the custom title
      expect(getCleanText(content)).toBe('Test Content'); // Verify the custom content
    });
  });

  // Group for accessibility testing
  describe('Accessibility', () => {
    // Test: Ensure component passes axe accessibility checks
    it(`must comply with axe's basic rules`, async () => {
      const results = await axe(document.body, {
        rules: {
          region: { enabled: false } // Disable specific rules (if necessary)
        }
      });
      expect(results).toHaveNoViolations(); // Check for accessibility violations
    });

    // Test: Default role should be "group"
    it('must have the default group role', async () => {
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('role')).toBe('group'); // Check default role
    });

    // Test: Role should change to "button" when interactive
    it('must have the role button when it is interactive', async () => {
      cardElement.setAttribute('interactive', ''); // Set the interactive attribute
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('role')).toBe('button'); // Check updated role
    });

    // Test: Ensure focusability when interactive
    it('must be focusable when interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('tabindex')).toBe('0'); // Verify tabindex
    });
  });

  // Group for testing interactivity
  describe('Interactivity', () => {
    // Test: Emitting events on click
    it('must emit event on click when interactive', async () => {
      cardElement.setAttribute('interactive', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      let eventFired = false; // Track if the event is fired
      let eventDetail = null; // Capture event details
      cardElement.addEventListener('card-interaction', (e) => {
        eventFired = true;
        eventDetail = e.detail; // Store event details
      });
      
      const card = queryShadowRoot(cardElement, '.card');
      card.click(); // Simulate a click
      
      expect(eventFired).toBe(true); // Ensure the event was fired
      expect(eventDetail.type).toBe('click'); // Verify event type
    });

    // Test: Handling keyboard interaction (Enter key)
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
      
      expect(eventFired).toBe(true); // Ensure the event was fired
    });

    // Test: Ensuring events are not fired when disabled
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
      
      expect(eventFired).toBe(false); // Ensure no event is fired
    });
  });

  // Group for testing states (selected, expanded, disabled)
  describe('States', () => {
    it('must handle the selected state', async () => {
      cardElement.setAttribute('interactive', '');
      cardElement.setAttribute('selected', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-selected')).toBe('true'); // Verify aria-selected
    });

    it('must handle the expanded state', async () => {
      cardElement.setAttribute('interactive', '');
      cardElement.setAttribute('expanded', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-expanded')).toBe('true'); // Verify aria-expanded
    });

    it('must handle the disabled state', async () => {
      cardElement.setAttribute('disabled', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      expect(card.getAttribute('aria-disabled')).toBe('true'); // Verify aria-disabled
    });
  });

  // Group for testing orientation
  describe('Orientation', () => {
    it('should be vertical by default', async () => {
      const card = queryShadowRoot(cardElement, '.card');
      const styles = window.getComputedStyle(card);
      expect(styles.flexDirection).toBe('column'); // Default orientation is vertical
    });

    it('must change to horizontal when specifying', async () => {
      cardElement.setAttribute('orientation', 'horizontal'); // Set horizontal orientation
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const card = queryShadowRoot(cardElement, '.card');
      const styles = window.getComputedStyle(card);
      expect(styles.flexDirection).toBe('row'); // Verify horizontal orientation
      expect(card.getAttribute('aria-orientation')).toBe('horizontal'); // Verify aria-orientation
    });
  });
});
