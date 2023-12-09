
class Plan {
    constructor(data) {
        this.title = data.title;
        this.image = data.image;
        this.evaluation = data.evaluation;
        this.tag = data.tag;
        this.location = data.location;
        this.buttonText = data.buttonText;
        this.place1 = data.place1;
        this.place2 = data.place2;
        this.place3 = data.place3;
        this.place4 = data.place4;
        this.place5 = data.place5;
        this.stars = data.stars; 
        this.id = data.id;
    }

    render() {        
        const article = document.createElement('article');
        article.classList.add('item');
        article.innerHTML = `
            <div class="PlanImage">
                <img src="${this.image}" alt="${this.title}">
                <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i> <span>${this.stars}</span></meter>
            </div>
            <div class="PlanInfo">
                <h3>${this.title}</h3>
                <p>
                    <i class="fa-solid fa-tag"></i>
                    ${this.tag}
                </p>
                <add-to-card data-id="${this.id}" class="add-to-card">Add to Card</add-to-card>
                <address>
                    <i class="fa-solid fa-location-dot"></i>
                    ${this.location}
                </address>
                <p>
                    <i class="fa-regular fa-clock"></i>
                    <time datetime="2023-02-08">7:30</time>-<time>21:00</time>
                </p>
                <ol>
                    ${this.place1 ? `<li class="active">${this.place1}</li>` : '<li class="deactive"></li>'}
                    ${this.place2 ? `<li class="active">${this.place2}</li>` : '<li class="deactive"></li>'}
                    ${this.place3 ? `<li class="active">${this.place3}</li>` : '<li class="deactive"></li>'}
                    ${this.place4 ? `<li class="active">${this.place4}</li>` : '<li class="deactive"></li>'}
                    ${this.place5 ? `<li class="active">${this.place5}</li>` : '<li class="deactive"></li>'}
                </ol>
                <a href="./plan.html?planName=${this.title}&tag=${this.tag}" >
                    <button class="value"><span>${this.buttonText}</span>-С эхэлнэ</button>
                </a>
            </div>
        `;

        const addToCardButton = article.querySelector('.add-to-card');

        addToCardButton.addEventListener('click', () => {
            // Handle the add-to-card functionality here
            console.log(`Adding plan with ID ${this.id} to the card`);
        });

        return article;
    }
}

class PlanRenderer {
    constructor(apiUrl, tagFilter) {
        this._plansList = [];
        this._apiUrl = apiUrl;
        this._tagFilter = tagFilter;
    }

    async fetchAndRenderPlaces(targetSelector) {
        try {
            const response = await fetch(this._apiUrl);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data && Array.isArray(data.record)) {
                this._plansList = this.filterPlacesByTag(data.record);
                this.renderPlans(targetSelector);
            } else {
                console.error('Error: Expected an array of records in the response');
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error.message);
        }
    }

    filterPlacesByTag(placesData) {
        if (!this._tagFilter) {
            return placesData;
        }
        return placesData.filter(place => place.tag.toLowerCase() == this._tagFilter.toLowerCase());
    }

    renderPlans(targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        targetElement.innerHTML = ''; 
        this._plansList.forEach(planData => {
            const plan = new Plan(planData);
            targetElement.appendChild(plan.render());
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.jsonbin.io/v3/b/65642e7854105e766fd5f6fd";
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    const planRenderer = new PlanRenderer(apiUrl, tagFilter);
    planRenderer.fetchAndRenderPlaces('.plans');
});