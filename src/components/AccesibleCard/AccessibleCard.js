export class AccessibleCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title',
      'content',
      'interactive',
      'expanded',
      'selected',
      'disabled',
      'orientation'
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
    if (this.isInteractive()) {
      const card = this.shadowRoot.querySelector('.card');
      card.addEventListener('click', this.handleClick.bind(this));
      card.addEventListener('keydown', this.handleKeydown.bind(this));
      // Para dispositivos táctiles
      card.addEventListener('touchend', this.handleClick.bind(this));
    }
  }

  removeEventListeners() {
    const card = this.shadowRoot.querySelector('.card');
    if (card) {
      card.removeEventListener('click', this.handleClick.bind(this));
      card.removeEventListener('keydown', this.handleKeydown.bind(this));
      card.removeEventListener('touchend', this.handleClick.bind(this));
    }
  }

  handleClick(event) {
    if (!this.hasAttribute('disabled')) {
      event.preventDefault();
      this.handleInteraction(event);
    }
  }

  handleKeydown(event) {
    if (!this.hasAttribute('disabled') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.handleInteraction(event);
    }
  }

  handleInteraction(event) {
    if (this.hasAttribute('expanded')) {
      this.toggleAttribute('expanded');
    }
    if (this.hasAttribute('selected')) {
      this.toggleAttribute('selected');
    }

    this.dispatchEvent(new CustomEvent('card-interaction', {
      bubbles: true,
      composed: true,
      detail: {
        type: event.type,
        expanded: this.hasAttribute('expanded'),
        selected: this.hasAttribute('selected'),
        timestamp: new Date()
      }
    }));
  }

  isInteractive() {
    return this.hasAttribute('interactive') || 
           this.hasAttribute('expanded') || 
           this.hasAttribute('selected');
  }

  render() {
    const isInteractive = this.isInteractive();
    const isDisabled = this.hasAttribute('disabled');
    const orientation = this.getAttribute('orientation') || 'vertical';

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        contain: content;
      }

      .card {
        border: 1px solid var(--card-border-color, #ccc);
        padding: var(--card-padding, 1rem);
        border-radius: var(--card-border-radius, 0.375rem);
        background: var(--card-background, #ffffff);
        color: var(--card-color, #1f2937);
        box-shadow: var(--card-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
        display: flex;
        flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
        gap: 0.75rem;
        position: relative;
        transition: 0.2s ease;
        transition-property: border-color, box-shadow, transform;
        min-height: 44px;
        min-width: 44px;
      }

      .card[tabindex="0"]:not([aria-disabled="true"]) {
        cursor: pointer;
      }

      .card[tabindex="0"]:not([aria-disabled="true"]):hover {
        border-color: var(--card-hover-border-color, #2563eb);
        box-shadow: var(--card-hover-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
        transform: translateY(-1px);
      }

      .card[tabindex="0"]:not([aria-disabled="true"]):active {
        transform: translateY(0);
      }

      .card:focus-visible {
        outline: 2px solid var(--card-focus-color, #2563eb);
        outline-offset: 2px;
      }

      .card[aria-selected="true"] {
        border-color: var(--card-selected-border-color, #2563eb);
        background: var(--card-selected-background, #eff6ff);
      }

      .card[aria-expanded="true"] {
        border-color: var(--card-expanded-border-color, #2563eb);
      }

      .card[aria-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      .card-title {
        margin: 0;
        font-size: var(--card-title-size, 1.125rem);
        font-weight: var(--card-title-weight, 600);
        color: var(--card-title-color, inherit);
        line-height: 1.4;
      }

      .card-content {
        margin: 0;
        color: var(--card-content-color, inherit);
        line-height: 1.5;
      }

      @media (prefers-reduced-motion: reduce) {
        .card {
          transition: none;
        }
      }

      @media (prefers-contrast: more) {
        .card {
          border-width: 2px;
        }
        .card[aria-selected="true"] {
          outline: 2px solid currentColor;
        }
      }

      @media (forced-colors: active) {
        .card {
          border: 1px solid CanvasText;
        }
        .card[aria-selected="true"] {
          border: 2px solid CanvasText;
        }
      }
    `;

    const template = `
      <section 
        class="card"
        role="${isInteractive ? 'button' : 'group'}"
        aria-labelledby="title-${this._uniqueId}"
        ${isInteractive ? 'tabindex="0"' : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        ${this.hasAttribute('expanded') ? `aria-expanded="${this.hasAttribute('expanded')}"` : ''}
        ${this.hasAttribute('selected') ? `aria-selected="${this.hasAttribute('selected')}"` : ''}
        ${orientation === 'horizontal' ? 'aria-orientation="horizontal"' : ''}
      >
        <h3 id="title-${this._uniqueId}" class="card-title">${this.getAttribute('title') || 'Título de la tarjeta'}</h3>
        <p class="card-content">${this.getAttribute('content') || 'Contenido de la tarjeta'}</p>
      </section>`.trim();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    
    const templateEl = document.createElement('template');
    templateEl.innerHTML = template;
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }
}

// Definir el componente
export function defineAccessibleCard() {
  if (!customElements.get('accessible-card')) {
    customElements.define('accessible-card', AccessibleCard);
  }
}