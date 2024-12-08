// AccessibleButton.js
export class AccessibleButton extends HTMLElement {
  static get observedAttributes() {
    return [
      "label",
      "disabled",
      "aria-label",
      "type",
      "aria-expanded",
      "aria-pressed",
      "aria-controls",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector("button");

    // Manejar eventos de teclado para accesibilidad
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.handleClick();
      }
    });

    // Propagate click events
    button.addEventListener("click", (e) => {
      if (!this.disabled) {
        this.handleClick();
      } else {
        e.preventDefault();
      }
    });

    // Delegating the focus
    this.addEventListener("focus", () => {
      button.focus();
    });
  }

  handleClick() {
    if (!this.disabled) {
      const event = new CustomEvent("button-click", {
        bubbles: true,
        composed: true,
        detail: { timestamp: new Date() },
      });
      this.dispatchEvent(event);
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  render() {
    const button = document.createElement("button");

    // Set basic attributes
    button.textContent = this.getAttribute("label") || "Button";
    button.type = this.getAttribute("type") || "button";

    // Configurar estados y roles ARIA
    if (this.hasAttribute("aria-label")) {
      button.setAttribute("aria-label", this.getAttribute("aria-label"));
    }
    if (this.hasAttribute("aria-expanded")) {
      button.setAttribute("aria-expanded", this.getAttribute("aria-expanded"));
    }
    if (this.hasAttribute("aria-pressed")) {
      button.setAttribute("aria-pressed", this.getAttribute("aria-pressed"));
    }
    if (this.hasAttribute("aria-controls")) {
      button.setAttribute("aria-controls", this.getAttribute("aria-controls"));
    }

    // Handle disabled status
    if (this.disabled) {
      button.setAttribute("disabled", "");
      button.setAttribute("aria-disabled", "true");
    }

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
      }
      
      button {
        background: #0078d4;
        color: white;
        border: none;
        padding: 10px 15px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
        min-height: 44px;
        min-width: 44px;
      }

      /* Alto contraste */
      @media (prefers-contrast: more) {
        button {
          border: 2px solid #000;
          outline: 2px solid #fff;
        }
      }

      /* Reducción de movimiento */
      @media (prefers-reduced-motion: reduce) {
        button {
          transition: none;
        }
      }

      /* Estados interactivos */
      button:hover:not([disabled]) {
        background: #106ebe;
      }

      button:focus {
        outline: 2px solid #ffffff;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.4);
      }

      button:active:not([disabled]) {
        background: #005a9e;
      }

      /* Estado deshabilitado */
      button[disabled] {
        background: #f3f2f1;
        color: #a19f9d;
        cursor: not-allowed;
      }

      /* Soporte para modo oscuro */
      @media (prefers-color-scheme: dark) {
        button {
          background: #2b88d8;
        }
        button:hover:not([disabled]) {
          background: #1b559b;
        }
        button:active:not([disabled]) {
          background: #0f3058;
        }
        button[disabled] {
          background: #3b3a39;
          color: #605e5c;
        }
      }
    `;

    // Clear the shadow DOM before rendering
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(button);
  }
}

export function defineAccessibleButton() {
  if (!customElements.get("accessible-button")) {
    customElements.define("accessible-button", AccessibleButton);
  }
}
