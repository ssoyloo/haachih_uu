class DarkMode extends HTMLElement {
    constructor() {
        super();
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    connectedCallback() {
        //implementation
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('dark-mode', DarkMode);