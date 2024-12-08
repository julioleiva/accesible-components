export class AccessibleCard extends HTMLElement {
  // Specify attributes to observe for changes
  static get observedAttributes() {
    return [
      'title',       
      'content',    
      'interactive', // Determines if the card is interactive (clickable, focusable)
      'expanded',    // ARIA expanded state
      'selected',    // ARIA selected state
      'disabled',   
      'orientation'  // Orientation of the card: 'horizontal' or 'vertical'
    ];
  }

  constructor() {
    super();
    // Attach a Shadow DOM to the element for encapsulated styling
    this.attachShadow({ mode: 'open' });
    // Generate a unique ID for ARIA attributes
    this._uniqueId = Math.random().toString(36).substr(2, 9);
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    this.render(); // Render the card's structure
    this.setupEventListeners(); // Add event listeners for interactivity
  }

  // Called when the element is removed from the DOM
  disconnectedCallback() {
    this.removeEventListeners(); // Clean up event listeners
  }

  // Triggered when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(); // Re-render the card to reflect changes
      this.setupEventListeners(); // Re-setup event listeners for new state
    }
  }

  // Add event listeners for interactivity (click, keydown, touchend)
  setupEventListeners() {
    if (this.isInteractive()) {
      const card = this.shadowRoot.querySelector('.card');
      card.addEventListener('click', this.handleClick.bind(this));
      card.addEventListener('keydown', this.handleKeydown.bind(this));
      card.addEventListener('touchend', this.handleClick.bind(this)); // Touch support
    }
  }

  // Remove previously added event listeners
  removeEventListeners() {
    const card = this.shadowRoot.querySelector('.card');
    if (card) {
      card.removeEventListener('click', this.handleClick.bind(this));
      card.removeEventListener('keydown', this.handleKeydown.bind(this));
      card.removeEventListener('touchend', this.handleClick.bind(this));
    }
  }

  // Handle click events
  handleClick(event) {
    if (!this.hasAttribute('disabled')) { // Skip if the card is disabled
      event.preventDefault();
      this.handleInteraction(event); // Handle interaction logic
    }
  }

  // Handle keydown events for Enter and Space keys
  handleKeydown(event) {
    if (!this.hasAttribute('disabled') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.handleInteraction(event); // Handle interaction logic
    }
  }

  // Handle card interaction logic (toggle states, emit events)
  handleInteraction(event) {
    if (this.hasAttribute('expanded')) {
      this.toggleAttribute('expanded'); // Toggle the "expanded" attribute
    }
    if (this.hasAttribute('selected')) {
      this.toggleAttribute('selected'); // Toggle the "selected" attribute
    }

    // Dispatch a custom event with interaction details
    this.dispatchEvent(new CustomEvent('card-interaction', {
      bubbles: true, // Allow event to bubble up through DOM
      composed: true, // Allow event to cross shadow DOM boundaries
      detail: {
        type: event.type, // Type of interaction (click, keydown)
        expanded: this.hasAttribute('expanded'), // Expanded state
        selected: this.hasAttribute('selected'), // Selected state
        timestamp: new Date() // Timestamp of the interaction
      }
    }));
  }

  // Determine if the card should be interactive
  isInteractive() {
    return this.hasAttribute('interactive') || 
           this.hasAttribute('expanded') || 
           this.hasAttribute('selected');
  }

  // Render the card's structure and styles
  render() {
    const isInteractive = this.isInteractive(); // Check if the card is interactive
    const isDisabled = this.hasAttribute('disabled'); // Check if the card is disabled
    const orientation = this.getAttribute('orientation') || 'vertical'; // Default orientation

    const style = document.createElement('style'); // Create style element
    style.textContent = `
      :host {
        display: block;
        contain: content; /* Optimize rendering performance */
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
        min-height: 44px;
        min-width: 44px;
      }

      .card[tabindex="0"]:not([aria-disabled="true"]) {
        cursor: pointer;
      }

      .card[aria-disabled="true"] {
        opacity: 0.5; /* Visual feedback for disabled state */
        pointer-events: none; /* Disable all interactions */
      }

      .card-title {
        margin: 0;
        font-size: var(--card-title-size, 1.125rem);
        font-weight: var(--card-title-weight, 600);
      }

      .card-content {
        margin: 0;
      }
    `;

    const template = `
      <section 
        class="card"
        role="${isInteractive ? 'button' : 'group'}"
        aria-labelledby="title-${this._uniqueId}"
        ${isInteractive ? 'tabindex="0"' : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}
        ${this.hasAttribute('expanded') ? `aria-expanded="true"` : ''}
        ${this.hasAttribute('selected') ? `aria-selected="true"` : ''}
        ${orientation === 'horizontal' ? 'aria-orientation="horizontal"' : ''}
      >
        <h3 id="title-${this._uniqueId}" class="card-title">${this.getAttribute('title') || 'Título de la tarjeta'}</h3>
        <p class="card-content">${this.getAttribute('content') || 'Contenido de la tarjeta'}</p>
      </section>
    `;

    // Clear shadow DOM and append the new content
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style); // Append styles
    this.shadowRoot.innerHTML += template; // Append HTML structure
  }
}

// Define the custom element if it hasn't already been defined
export function defineAccessibleCard() {
  if (!customElements.get('accessible-card')) {
    customElements.define('accessible-card', AccessibleCard);
  }
}


