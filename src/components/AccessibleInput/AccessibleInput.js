export class AccessibleInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'type',
      'placeholder',
      'value',
      'required',
      'disabled',
      'readonly',
      'pattern',
      'minlength',
      'maxlength',
      'error'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._uniqueId = Math.random().toString(36).substr(2, 9);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', this.handleInput.bind(this));
    input.addEventListener('blur', this.handleBlur.bind(this));
    input.addEventListener('invalid', this.handleInvalid.bind(this));
  }

  removeEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.removeEventListener('input', this.handleInput.bind(this));
      input.removeEventListener('blur', this.handleBlur.bind(this));
      input.removeEventListener('invalid', this.handleInvalid.bind(this));
    }
  }

  handleInput(event) {
    this.dispatchEvent(new CustomEvent('input-change', {
      bubbles: true,
      composed: true,
      detail: { value: event.target.value }
    }));
    this.removeAttribute('error');
  }

  handleBlur(event) {
    this.dispatchEvent(new CustomEvent('input-blur', {
      bubbles: true,
      composed: true,
      detail: { value: event.target.value }
    }));
    this.validate();
  }

  handleInvalid(event) {
    event.preventDefault();
    this.setAttribute('error', event.target.validationMessage);
  }

  validate() {
    const input = this.shadowRoot.querySelector('input');
    if (!input.checkValidity()) {
      this.setAttribute('error', input.validationMessage);
      return false;
    }
    return true;
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        margin-bottom: var(--input-margin-bottom, 1rem);
        color: var(--input-color, #1f2937);
      }

      .input-wrapper {
        display: grid;
        gap: 0.5rem;
      }

      label {
        color: var(--label-color, inherit);
        font-size: var(--label-size, 0.875rem);
        font-weight: var(--label-weight, 500);
        line-height: 1.4;
      }

      .required {
        color: var(--required-color, #dc2626);
        margin-left: 0.25rem;
      }

      input {
        width: 100%;
        min-height: 44px;
        padding: var(--input-padding, 0.625rem 0.875rem);
        font-family: inherit;
        font-size: var(--input-font-size, 1rem);
        line-height: 1.5;
        color: inherit;
        background: var(--input-background, #ffffff);
        border: 1px solid var(--input-border-color, #d1d5db);
        border-radius: var(--input-border-radius, 0.375rem);
        transition: 0.2s ease;
        transition-property: border-color, box-shadow;
      }

      input:hover {
        border-color: var(--input-hover-border-color, #9ca3af);
      }

      input:focus {
        border-color: var(--input-focus-border-color, #2563eb);
        box-shadow: 0 0 0 3px var(--input-focus-ring-color, rgb(37 99 235 / 0.15));
        outline: none;
      }

      input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--input-disabled-background, #f3f4f6);
      }

      input::placeholder {
        color: var(--input-placeholder-color, #9ca3af);
      }

      [aria-invalid="true"] {
        border-color: var(--input-error-border-color, #dc2626);
      }

      [aria-invalid="true"]:focus {
        border-color: var(--input-error-border-color, #dc2626);
        box-shadow: 0 0 0 3px var(--input-error-ring-color, rgb(220 38 38 / 0.15));
      }

      .error-message {
        color: var(--error-color, #dc2626);
        font-size: var(--error-font-size, 0.875rem);
        line-height: 1.4;
      }

      @media (prefers-reduced-motion: reduce) {
        input {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        input {
          border: 1px solid CanvasText;
        }
        input:focus {
          outline: 2px solid CanvasText;
        }
      }
    `;

    const template = `
      <div class="input-wrapper">
        <label 
          for="input-${this._uniqueId}"
          ${this.hasAttribute('required') ? 'aria-required="true"' : ''}
        >
          ${this.getAttribute('label') || 'Input'}
          ${this.hasAttribute('required') ? '<span class="required" aria-hidden="true">*</span>' : ''}
        </label>
        <input
          id="input-${this._uniqueId}"
          type="${this.getAttribute('type') || 'text'}"
          placeholder="${this.getAttribute('placeholder') || ''}"
          value="${this.getAttribute('value') || ''}"
          aria-invalid="${this.hasAttribute('error')}"
          aria-describedby="${this.hasAttribute('error') ? `error-${this._uniqueId}` : ''}"
          ${this.hasAttribute('required') ? 'required' : ''}
          ${this.hasAttribute('disabled') ? 'disabled' : ''}
          ${this.hasAttribute('readonly') ? 'readonly' : ''}
          ${this.hasAttribute('pattern') ? `pattern="${this.getAttribute('pattern')}"` : ''}
          ${this.hasAttribute('minlength') ? `minlength="${this.getAttribute('minlength')}"` : ''}
          ${this.hasAttribute('maxlength') ? `maxlength="${this.getAttribute('maxlength')}"` : ''}
        >
        ${this.hasAttribute('error') ? `
          <div id="error-${this._uniqueId}" class="error-message">
            ${this.getAttribute('error')}
          </div>
        ` : ''}
      </div>
    `.trim();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);

    const templateEl = document.createElement('template');
    templateEl.innerHTML = template;
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }
}

export function defineAccessibleInput() {
  if (!customElements.get('accessible-input')) {
    customElements.define('accessible-input', AccessibleInput);
  }
}