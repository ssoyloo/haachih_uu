class ExpandableList extends HTMLUListElement {
    constructor() {
        super()
        this.style.position = 'relative'
        this.toggleBtn = document.createElement('button')
        this.toggleBtn.style.position = 'absolute'
        this.toggleBtn.style.border = 'none'
        this.toggleBtn.style.background = 'none'
        this.toggleBtn.style.padding = 0
        this.toggleBtn.style.top = 0
        this.toggleBtn.style.left = '5px'
        this.toggleBtn.style.cursor = 'pointer'
        this.toggleBtn.innerText = '>'
        this.toggleBtn.addEventListener('click', () => {
            this.dataset.expanded = !this.isExpanded
        })
        this.appendChild(this.toggleBtn)
    }

    get isExpanded() {
        return (
            this.dataset.expanded !== 'false' && this.dataset.expanded != null
        )
    }

    static get observedAttributes() {
        return ['data-expanded']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateStyles()
    }

    connectedCallback() {
        this.updateStyles()
    }

    updateStyles() {
        const transform = this.isExpanded ? 'rotate(90deg)' : ''
        this.toggleBtn.style.transform = transform
        ;[...this.children].forEach((child) => {
            if (child !== this.toggleBtn) {
                child.style.display = this.isExpanded ? '' : 'none'
            }
        })
    }
}

customElements.define('expandable-list', ExpandableList, { extends: 'ul' })
