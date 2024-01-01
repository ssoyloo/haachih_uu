class AddToCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
        <button class="addToCard "><i class="fa-regular fa-heart"></i></button>`;
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            const planInfoDiv = this.closest('.details');
            
            const PlanImageDiv = this.closest('.subNewPlaces');
            const list = document.querySelector("favourite-place");
            console.log(planInfoDiv.querySelector('button'))
            if (list) {
                const json = {
                    "title": planInfoDiv.querySelector('h3').textContent.trim(),
                    "image": PlanImageDiv.querySelector('img').getAttribute('src'),
                    "tag": planInfoDiv.querySelector('p').textContent.trim(),
                    // "location": planInfoDiv.querySelector('address').textContent.trim(),
                    "buttonText": planInfoDiv.querySelector('button').textContent.trim(),
                    "type": "place",
                    "unit": 1
                };
                list.addToCart(json);
            } else {
                console.error("favourite-place not found");
            }
        });
    }
}

window.customElements.define('add-place-card', AddToCard);
