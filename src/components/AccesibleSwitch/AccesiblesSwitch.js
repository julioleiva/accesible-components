class AccesiblesSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isChecked = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  setupEventListeners() {
    const switchElement = this.shadowRoot.querySelector(".switch");
    switchElement.addEventListener("click", this.toggle.bind(this));
  }

  removeEventListeners() {
    const switchElement = this.shadowRoot.querySelector(".switch");
    if (switchElement) {
      switchElement.removeEventListener("click", this.toggle.bind(this));
    }
  }

  toggle() {
    this.isChecked = !this.isChecked;
    this.updateSwitchVisual();
  }

  updateSwitchVisual() {
    const toggleElement = this.shadowRoot.querySelector(".toggle");
    toggleElement.style.left = this.isChecked ? "25px" : "0";
    const switchElement = this.shadowRoot.querySelector(".switch");
    switchElement.style.backgroundColor = this.isChecked ? "#2563eb" : "gray";
  }

  render() {
    const style = `
      .switch {
        width: 50px;
        height: 25px;
        background: gray;
        border-radius: 12.5px;
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: ${this.isChecked ? "flex-end" : "flex-start"};
        transition: background-color 0.2s ease, justify-content 0.2s ease;
      }
      .toggle {
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        position: absolute;
        left: ${this.isChecked ? "25px" : "0"};
        transition: left 0.2s ease;
      }
    `;

    const html = `
      <div class="switch">
        <div class="toggle"></div>
      </div>
    `;

    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;
  }
}

customElements.define("accesible-switch", AccesiblesSwitch);
