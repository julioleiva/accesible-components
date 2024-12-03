import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defineAccessibleInput } from './AccessibleInput';

expect.extend(toHaveNoViolations);

function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root no encontrado.');
  return root.shadowRoot.querySelector(selector);
}

describe('AccessibleInput', () => {
  let inputElement;
  let mainElement;

  beforeAll(() => {
    defineAccessibleInput();
  });

  beforeEach(async () => {
    document.body.innerHTML = '';
    mainElement = document.createElement('main');
    mainElement.setAttribute('role', 'main');
    document.body.appendChild(mainElement);
    
    inputElement = document.createElement('accessible-input');
    mainElement.appendChild(inputElement);
    await new Promise(resolve => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Accesibilidad', () => {
    it('debe cumplir con las reglas básicas de axe', async () => {
      const results = await axe(document.body, {
        rules: {
          region: { enabled: false }
        }
      });
      expect(results).toHaveNoViolations();
    });

    it('debe asociar correctamente label e input', () => {
      const label = queryShadowRoot(inputElement, 'label');
      const input = queryShadowRoot(inputElement, 'input');
      expect(label.getAttribute('for')).toBe(input.id);
    });

    it('debe indicar campos requeridos', async () => {
      inputElement.setAttribute('required', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const label = queryShadowRoot(inputElement, 'label');
      expect(label.getAttribute('aria-required')).toBe('true');
      expect(label.textContent).toContain('*');
    });

    it('debe manejar estados de error', async () => {
      inputElement.setAttribute('error', 'Error message');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      const errorMessage = queryShadowRoot(inputElement, '.error-message');
      
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-describedby')).toBe(errorMessage.id);
      expect(errorMessage.textContent.trim()).toBe('Error message');
    });
  });

  describe('Validación', () => {
    it('debe validar campos requeridos', async () => {
      inputElement.setAttribute('required', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = '';
      input.dispatchEvent(new Event('blur'));
      
      expect(inputElement.hasAttribute('error')).toBe(true);
    });

    it('debe validar patrones', async () => {
      inputElement.setAttribute('pattern', '[A-Za-z]{3}');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = '123';
      input.dispatchEvent(new Event('blur'));
      
      expect(inputElement.hasAttribute('error')).toBe(true);
    });

    it('debe validar longitud mínima', async () => {
      inputElement.setAttribute('minlength', '3');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = 'ab';
      input.dispatchEvent(new Event('blur'));
      
      expect(inputElement.hasAttribute('error')).toBe(true);
    });

    it('debe validar longitud máxima', async () => {
      inputElement.setAttribute('maxlength', '3');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = 'abcd';
      input.dispatchEvent(new Event('blur'));
      
      expect(inputElement.hasAttribute('error')).toBe(true);
    });
  });

  describe('Eventos', () => {
    it('debe emitir evento input-change', async () => {
      let eventFired = false;
      let eventDetail = null;
      
      inputElement.addEventListener('input-change', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      
      expect(eventFired).toBe(true);
      expect(eventDetail.value).toBe('test');
    });

    it('debe emitir evento input-blur', async () => {
      let eventFired = false;
      let eventDetail = null;
      
      inputElement.addEventListener('input-blur', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const input = queryShadowRoot(inputElement, 'input');
      input.value = 'test';
      input.dispatchEvent(new Event('blur'));
      
      expect(eventFired).toBe(true);
      expect(eventDetail.value).toBe('test');
    });
  });

  describe('Estados', () => {
    it('debe manejar estado deshabilitado', async () => {
      inputElement.setAttribute('disabled', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      expect(input.disabled).toBe(true);
    });

    it('debe manejar estado readonly', async () => {
      inputElement.setAttribute('readonly', '');
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const input = queryShadowRoot(inputElement, 'input');
      expect(input.readOnly).toBe(true);
    });
  });
});