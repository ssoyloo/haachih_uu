class AddToCard extends HTMLElement {
    constructor() {
        super();
        // Attach the styles directly to the shadow DOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
          <button class="addToCard "><i class="fa-regular fa-heart"></i></button>`;
    }

    connectedCallback() {
        // Use shadowRoot to query elements within the shadow DOM
        const button = this.shadowRoot.querySelector('button');

        button.addEventListener('click', () => {
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
                "type": "plan",
                "unit": 1
            };

            list.addToCart(json);
        });
    }
}

window.customElements.define('add-to-card', AddToCard);
