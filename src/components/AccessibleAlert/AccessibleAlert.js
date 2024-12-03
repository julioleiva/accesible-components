export class AccessibleAlert extends HTMLElement {
  static get observedAttributes() {
    return [
      'message',
      'type',
      'icon',
      'dismissible',
      'auto-dismiss',
      'title',
      'description',
      'live'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.dismissTimeout = null;
  }

  connectedCallback() {
    this.render();
    this.handleAutoDismiss();
  }

  disconnectedCallback() {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      if (name === 'auto-dismiss') {
        this.handleAutoDismiss();
      }
    }
  }

  handleAutoDismiss() {
    const autoDismissTime = parseInt(this.getAttribute('auto-dismiss'));
    if (autoDismissTime && !isNaN(autoDismissTime)) {
      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout);
      }
      this.dismissTimeout = setTimeout(() => {
        this.dismiss();
      }, autoDismissTime);
    }
  }

  getAlertStyles() {
    const type = this.getAttribute('type') || 'info';
    const styles = {
      info: {
        background: '#e8f4fd',
        color: '#004174',
        border: '#b3d7f4',
        icon: '💡'
      },
      success: {
        background: '#e8f8f0',
        color: '#0f5132',
        border: '#badbcc',
        icon: '✓'
      },
      warning: {
        background: '#fff8e6',
        color: '#664d03',
        border: '#ffecb5',
        icon: '⚠️'
      },
      error: {
        background: '#f8d7da',
        color: '#842029',
        border: '#f5c2c7',
        icon: '⚠'
      }
    };

    return styles[type] || styles.info;
  }

  dismiss() {
    const event = new CustomEvent('alert-dismiss', {
      bubbles: true,
      composed: true,
      detail: { timestamp: new Date() }
    });
    this.dispatchEvent(event);

    const alert = this.shadowRoot.querySelector('.alert');
    if (alert) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.remove();
      } else {
        alert.style.animation = 'fade-out 0.2s ease-out forwards';
        setTimeout(() => {
          this.remove();
        }, 200);
      }
    } else {
      this.remove();
    }
  }

  addDismissListeners() {
    const dismissButton = this.shadowRoot.querySelector('.alert-dismiss');
    if (dismissButton) {
      const handleDismiss = (e) => {
        e.preventDefault();
        this.dismiss();
      };

      dismissButton.addEventListener('click', handleDismiss);
      dismissButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.dismiss();
        }
      });
    }
  }

  render() {
    const styles = this.getAlertStyles();
    const iconAttribute = this.getAttribute('icon');
    const alertRole = this.getAttribute('live') === 'assertive' ? 'alertdialog' : 'alert';
    const ariaLive = this.getAttribute('live') || 'polite';

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        margin: 1rem 0;
        contain: content;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        border-radius: 0.375rem;
        border: 1px solid ${styles.border};
        background: ${styles.background};
        color: ${styles.color};
        font-size: 1rem;
        line-height: 1.5;
        animation: fade-in 0.2s ease-out;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      }

      .alert:focus-within {
        outline: 2px solid ${styles.color};
        outline-offset: 2px;
      }

      .alert-content {
        flex: 1;
      }

      .alert-icon {
        flex-shrink: 0;
        margin-right: 0.75rem;
        font-size: 1.25rem;
        line-height: 1;
        height: 1.25rem;
        width: 1.25rem;
      }

      .alert-title {
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        line-height: 1.5;
      }

      .alert-description {
        margin: 0;
      }

      .alert-dismiss {
        flex-shrink: 0;
        margin-left: 0.75rem;
        padding: 0.5rem;
        color: currentColor;
        background: transparent;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s ease;
        height: 2rem;
        width: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .alert-dismiss:hover {
        opacity: 1;
        background: rgb(0 0 0 / 0.05);
      }

      .alert-dismiss:focus-visible {
        outline: 2px solid ${styles.color};
        outline-offset: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        .alert,
        .alert-dismiss {
          animation: none;
          transition: none;
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-0.5rem);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fade-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-0.5rem);
        }
      }

      @media (prefers-contrast: more) {
        .alert {
          border: 2px solid currentColor;
        }
        .alert-dismiss {
          border: 1px solid currentColor;
        }
      }

      @media (forced-colors: active) {
        .alert {
          border: 1px solid CanvasText;
        }
        .alert-dismiss {
          border: 1px solid CanvasText;
        }
      }
    `;

    const template = `
      <div 
        class="alert"
        role="${alertRole}"
        aria-live="${ariaLive}"
        aria-atomic="true"
      >
        ${iconAttribute || styles.icon ? `
          <span class="alert-icon" aria-hidden="true">
            ${iconAttribute || styles.icon}
          </span>
        ` : ''}
        <div class="alert-content">
          ${this.getAttribute('title') ? `
            <h2 class="alert-title">${this.getAttribute('title')}</h2>
          ` : ''}
          <p class="alert-description">
            ${this.getAttribute('message') || this.getAttribute('description') || 'Mensaje de alerta'}
          </p>
        </div>
        ${this.getAttribute('dismissible') !== null ? `
          <button 
            class="alert-dismiss"
            aria-label="Cerrar alerta"
            type="button"
          >
            ×
          </button>
        ` : ''}
      </div>
    `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);

    const templateEl = document.createElement('template');
    templateEl.innerHTML = template;
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));

    this.addDismissListeners();
  }
}

export function defineAccessibleAlert() {
  if (!customElements.get('accessible-alert')) {
    customElements.define('accessible-alert', AccessibleAlert);
  }
}