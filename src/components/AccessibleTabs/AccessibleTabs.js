export class AccessibleTabs extends HTMLElement {
  static get observedAttributes() {
    return ["active-tab", "aria-label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._uniqueId = Math.random().toString(36).substr(2, 9);
  }

  connectedCallback() {
    this._setupTabs();
    this.render();
    this.setupEventListeners();
    this._initializeSelectedTab();
  
    // Observe child mutations
    this._mutationObserver = new MutationObserver(() => {
      this._setupTabs();
      this.render();
    });
  
    this._mutationObserver.observe(this, { childList: true, subtree: false });
  }
  
  disconnectedCallback() {
    this.removeEventListeners();
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }
  }
  

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "active-tab") {
        this.switchTab(newValue);
      } else if (name === "aria-label") {
        this.updateAriaLabel();
      }
    }
  }

  _setupTabs() {
    this.tabs = Array.from(this.children).filter((child) =>
      child.hasAttribute("tab-label")
    );
  
    this.tabs.forEach((tab, index) => {
      tab.setAttribute("tab-id", `tab-${this._uniqueId}-${index}`);
      tab.setAttribute("slot", `content-${index}`);
    });
  }
  

  setupEventListeners() {
    const tablist = this.shadowRoot.querySelector('[role="tablist"]');
    tablist.addEventListener("keydown", this._handleKeydown.bind(this));

    const tabs = this.shadowRoot.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener("click", this._handleClick.bind(this));
    });
  }

  removeEventListeners() {
    const tablist = this.shadowRoot.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.removeEventListener("keydown", this._handleKeydown.bind(this));
    }
  }

  _handleClick(event) {
    const tab = event.target.closest('[role="tab"]');
    if (tab) {
      this.switchTab(tab.getAttribute("aria-controls"));
    }
  }

  _handleKeydown(event) {
    const tabs = Array.from(this.shadowRoot.querySelectorAll('[role="tab"]'));
    const currentTab = this.shadowRoot.activeElement;
    const currentIndex = tabs.indexOf(currentTab);

    let newIndex;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[newIndex].focus();
    this.switchTab(tabs[newIndex].getAttribute("aria-controls"));
  }

  _initializeSelectedTab() {
    const firstTab = this.shadowRoot.querySelector('[role="tab"]');
    if (firstTab) {
      this.switchTab(firstTab.getAttribute("aria-controls"));
    }
  }

  switchTab(tabId) {
    const tabs = this.shadowRoot.querySelectorAll('[role="tab"]');
    const panels = this.shadowRoot.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === tabId;
      tab.setAttribute("aria-selected", selected.toString());
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tabId;
      if (!panel.hidden) {
        this.setAttribute("active-tab", tabId);
        this.dispatchEvent(
          new CustomEvent("tab-change", {
            bubbles: true,
            composed: true,
            detail: { tabId },
          })
        );
      }
    });
  }

  updateAriaLabel() {
    const tablist = this.shadowRoot.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.setAttribute("aria-label", this.getAttribute("aria-label") || "Tabs");
    }
  }

  render() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        contain: content;
      }

      [role="tablist"] {
        display: flex;
        gap: var(--tabs-gap, 0.25rem);
        border-bottom: 1px solid var(--tabs-border-color, #d1d5db);
        margin-bottom: var(--tabs-margin, 1rem);
      }

      [role="tab"] {
        padding: var(--tab-padding, 0.75rem 1rem);
        border: none;
        background: none;
        color: var(--tab-color, #4b5563);
        font-size: var(--tab-font-size, 0.875rem);
        font-weight: var(--tab-font-weight, 500);
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: 0.2s ease;
        min-height: 44px;
        min-width: 44px;
      }

      [role="tab"]:hover {
        color: var(--tab-hover-color, #1f2937);
      }

      [role="tab"][aria-selected="true"] {
        color: var(--tab-selected-color, #2563eb);
        border-bottom-color: currentColor;
      }

      [role="tab"]:focus-visible {
        outline: 2px solid var(--tab-focus-color, #2563eb);
        outline-offset: -2px;
        border-radius: 2px;
      }

      [role="tabpanel"] {
        padding: var(--panel-padding, 1rem);
      }

      [role="tabpanel"][hidden] {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        [role="tab"] {
          transition: none;
        }
      }
    `;

    const template = `
      <div role="application" aria-label="${this.getAttribute("aria-label") || "Tabs"}">
        <div role="tablist" aria-label="${this.getAttribute("aria-label") || "Tabs"}">
          ${this.tabs
            .map(
              (tab, index) => `
            <button
              role="tab"
              id="tab-${this._uniqueId}-${index}"
              aria-controls="panel-${this._uniqueId}-${index}"
              aria-selected="${index === 0}"
              tabindex="${index === 0 ? 0 : -1}"
            >
              ${tab.getAttribute("tab-label")}
            </button>
          `
            )
            .join("")}
        </div>

        ${this.tabs
          .map(
            (tab, index) => `
          <div
            role="tabpanel"
            id="panel-${this._uniqueId}-${index}"
            aria-labelledby="tab-${this._uniqueId}-${index}"
            hidden="${index !== 0}"
          >
            <slot name="content-${index}"></slot>
          </div>
        `
          )
          .join("")}
      </div>
    `.trim();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(style);

    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }
}

export function defineAccessibleTabs() {
  if (!customElements.get("accessible-tabs")) {
    customElements.define("accessible-tabs", AccessibleTabs);
  }
}
