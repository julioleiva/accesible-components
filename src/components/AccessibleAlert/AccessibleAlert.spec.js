import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defineAccessibleAlert } from './AccessibleAlert';

expect.extend(toHaveNoViolations);

function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root no encontrado.');
  return root.shadowRoot.querySelector(selector);
}

function verifyBackgroundColor(element, expectedHexColor) {
  const styles = window.getComputedStyle(element);
  const backgroundColor = styles.background || styles.backgroundColor;
  
  const tempDiv = document.createElement('div');
  tempDiv.style.backgroundColor = expectedHexColor;
  document.body.appendChild(tempDiv);
  const expectedColor = window.getComputedStyle(tempDiv).backgroundColor;
  document.body.removeChild(tempDiv);
  
  expect(backgroundColor).toBe(expectedColor);
}

describe('AccessibleAlert', () => {
  let alertElement;

  beforeAll(() => {
    defineAccessibleAlert();
  });

  beforeEach(async () => {
    document.body.innerHTML = '';
    alertElement = document.createElement('accessible-alert');
    document.body.appendChild(alertElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  // Basic rendering tests
  describe('Renderizado básico', () => {
    it('should render the component with default message', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert).toBeTruthy();
      const description = queryShadowRoot(alertElement, '.alert-description');
      expect(description.textContent.trim()).toBe('Mensaje de alerta');
    });

    it('should render custom message', async () => {
      const message = 'Test de alerta';
      alertElement.setAttribute('message', message);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const description = queryShadowRoot(alertElement, '.alert-description');
      expect(description.textContent.trim()).toBe(message);
    });

    it('should render title when provided', async () => {
      const title = 'Título de prueba';
      alertElement.setAttribute('title', title);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const titleElement = queryShadowRoot(alertElement, '.alert-title');
      expect(titleElement.textContent).toBe(title);
    });

    it('should render icon when provided', async () => {
      const icon = '🔔';
      alertElement.setAttribute('icon', icon);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const iconElement = queryShadowRoot(alertElement, '.alert-icon');
      expect(iconElement).toBeTruthy();
      expect(iconElement.textContent.trim()).toBe(icon);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it(`must comply with axe's basic rules`, async () => {
      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    it('must have the default alert role', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert.getAttribute('role')).toBe('alert');
    });

    it('must switch to alertdialog role when live is assertive', async () => {
      alertElement.setAttribute('live', 'assertive');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert.getAttribute('role')).toBe('alertdialog');
    });

    it('must have aria-live polite by default', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert.getAttribute('aria-live')).toBe('polite');
    });

    it('debe tener aria-atomic true', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert.getAttribute('aria-atomic')).toBe('true');
    });

    it('must have aria-label on close button', async () => {
      alertElement.setAttribute('dismissible', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
      expect(dismissButton.getAttribute('aria-label')).toBe('Cerrar alerta');
    });
  });

  // Alert type tests
  describe('Types of alerts', () => {
    const types = ['info', 'success', 'warning', 'error'];

    types.forEach(type => {
      it(`must apply correct styles for type ${type}`, async () => {
        alertElement.setAttribute('type', type);
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        const alert = queryShadowRoot(alertElement, '.alert');
        const styles = window.getComputedStyle(alert);
        
        expect(styles.background).toBeTruthy();
        expect(styles.color).toBeTruthy();
        expect(styles.borderColor).toBeTruthy();
      });
    });

    it('must use default info style', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      verifyBackgroundColor(alert, '#e8f4fd');
    });
  });

  // Interactivity tests
  describe('Interactividad', () => {
    describe('Closing button', () => {
      it('must show close button when dismissible', async () => {
        alertElement.setAttribute('dismissible', '');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
        expect(dismissButton).toBeTruthy();
      });

      it('must issue event on closing', async () => {
        alertElement.setAttribute('dismissible', '');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        let eventDetail = null;
        alertElement.addEventListener('alert-dismiss', (e) => {
          eventFired = true;
          eventDetail = e.detail;
        });
        
        const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
        dismissButton.click();
        
        expect(eventFired).toBe(true);
        expect(eventDetail.timestamp instanceof Date).toBe(true);
      });

      it('must be keyboard accessible', async () => {
        alertElement.setAttribute('dismissible', '');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        alertElement.addEventListener('alert-dismiss', () => {
          eventFired = true;
        });
        
        const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
        dismissButton.dispatchEvent(new KeyboardEvent('keydown', { 
          key: 'Enter',
          bubbles: true,
          cancelable: true
        }));
        
        expect(eventFired).toBe(true);
      });

      it('must respond to the space key', async () => {
        alertElement.setAttribute('dismissible', '');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        alertElement.addEventListener('alert-dismiss', () => {
          eventFired = true;
        });
        
        const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
        dismissButton.dispatchEvent(new KeyboardEvent('keydown', { 
          key: ' ',
          bubbles: true,
          cancelable: true
        }));
        
        expect(eventFired).toBe(true);
      });
    });

    describe('Auto-dismiss', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('must self-close after the specified time', async () => {
        alertElement.setAttribute('auto-dismiss', '1000');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        alertElement.addEventListener('alert-dismiss', () => {
          eventFired = true;
        });
        
        vi.advanceTimersByTime(1000);
        expect(eventFired).toBe(true);
      });

      it('must clear timeout on disconnection', async () => {
        alertElement.setAttribute('auto-dismiss', '1000');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        alertElement.addEventListener('alert-dismiss', () => {
          eventFired = true;
        });
        
        alertElement.remove();
        vi.advanceTimersByTime(1000);
        expect(eventFired).toBe(false);
      });

      it('must update the timeout when the attribute changes', async () => {
        alertElement.setAttribute('auto-dismiss', '2000');
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        let eventFired = false;
        alertElement.addEventListener('alert-dismiss', () => {
          eventFired = true;
        });
        
        alertElement.setAttribute('auto-dismiss', '1000');
        
        vi.advanceTimersByTime(1000);
        expect(eventFired).toBe(true);
      });
    });
  });

  // Animation tests
  describe('Animación', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('must have input animation', async () => {
      const alert = queryShadowRoot(alertElement, '.alert');
      const styles = window.getComputedStyle(alert);
      expect(styles.animation).toContain('fade-in');
    });

    it('must have exit animation on closing', async () => {
      alertElement.setAttribute('dismissible', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const alert = queryShadowRoot(alertElement, '.alert');
      const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
      
      dismissButton.click();
      expect(alert.style.animation).toContain('fade-out');
    });

    it('must remove the element after the animation', async () => {
      alertElement.setAttribute('dismissible', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const dismissButton = queryShadowRoot(alertElement, '.alert-dismiss');
      dismissButton.click();
      
      vi.advanceTimersByTime(200);
      expect(document.body.contains(alertElement)).toBe(false);
    });
  });

  // Observed attribute tests
  describe('Observed attribute', () => {
    it('must update the content when the message changes', async () => {
      const newMessage = 'Updated message';
      alertElement.setAttribute('message', newMessage);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const description = queryShadowRoot(alertElement, '.alert-description');
      expect(description.textContent.trim()).toBe(newMessage);
    });

    it('must update the type when it changes', async () => {
      alertElement.setAttribute('type', 'success');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const alert = queryShadowRoot(alertElement, '.alert');
      verifyBackgroundColor(alert, '#e8f8f0');
    });

    it('must update the icon when it changes', async () => {
      const newIcon = '🎉';
      alertElement.setAttribute('icon', newIcon);
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const icon = queryShadowRoot(alertElement, '.alert-icon');
      expect(icon.textContent.trim()).toBe(newIcon);
    });

    it('you must update aria-live when you change', async () => {
      alertElement.setAttribute('live', 'assertive');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const alert = queryShadowRoot(alertElement, '.alert');
      expect(alert.getAttribute('aria-live')).toBe('assertive');
    });
  });
});