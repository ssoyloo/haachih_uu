class AddToCard extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `

            <button>Add to Fav</button>
        `;
    }

    connectedCallback() {
        this.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const planInfoDiv = this.closest('.PlanInfo');
                const PlanImageDiv = this.closest('.item').childNodes[1];
                const list = document.querySelector("favourite-plan");
                const json = {
                    "title": planInfoDiv.querySelector('h3').textContent.trim(),
                    "image": PlanImageDiv.querySelector('img').getAttribute('src'),
                    "tag": planInfoDiv.querySelector('p').textContent.trim(),
                    "location": planInfoDiv.querySelector('address').textContent.trim(),
                    "buttonText": planInfoDiv.querySelector('a button').textContent.trim(),
                    "stars": PlanImageDiv.querySelector('meter').textContent.trim(),
                    "type":"plan",
                    "unit": 1
                };
                list.addToCart(json);
            }
        });
    }
}

window.customElements.define('add-to-card', AddToCard);
