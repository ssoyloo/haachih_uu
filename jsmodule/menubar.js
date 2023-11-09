class Plan {
    constructor(data) {
        this.title = data.title;
        this.image = data.image;
        this.evaluation = data.evaluation;
        this.tag = data.tag;
        this.location = data.location;
        this.buttonText = data.buttonText;
    }

    render() {
        const article = document.createElement('article');
        article.classList.add('item');
        article.innerHTML = `
        <div class="PlanImage">
        <img src="${this.image}" alt="${this.title}">
        <meter id="gazar1" value="1" max="1">⭐ 5</meter>
    </div>
    <div class="PlanInfo">
        <button class="like"><i class="fa-regular fa-heart fa-2xl"></i></button>
        <h3>${this.title}</h3>
        <p>
            <i class="fa-solid fa-tag"></i>
            ${this.tag}
        </p>

        <address>
            <i class="fa-solid fa-location-dot"></i>
            ${this.location}
        </address>

        <a href="11326020">
            <i class="fa-solid fa-phone"></i>
            ${this.evaluation}</a> 
        <p>
            <i class="fa-regular fa-clock"></i>
            <time datetime="2023-02-08">7:30</time>-<time>21:00</time></p>
        <ol>
            <li class="active">Хоолны газар</li>
            <li>Хүрээлэн</li>
            <li>Караоке</li>
            <li>Паб, лоунж</li>
            <li>Клаб</li>
        </ol>
        <button class="value"><span>${this.buttonText}</span>-c эхэлье</button>
    </div>
        `;
        return article;
    }
}

class PlanRenderer {
    constructor(apiUrl, tagFilter) {
        this._plansList = [];
        this._apiUrl = apiUrl;
        this._tagFilter = tagFilter;
    }

    fetchAndRenderPlaces(targetSelector) {
        fetch(this._apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.record)) {
                    this._plansList = this.filterPlacesByTag(data.record);
                    this.renderPlans(targetSelector);
                } else {
                    console.error('Error: Expected an array of records in the response');
                }
            })
            .catch(error => {
                console.error('Error fetching places data:', error);
            });
    }

    filterPlacesByTag(placesData) {
        if (!this._tagFilter) {
            return placesData;
        }
        return placesData.filter(place => place.tag.toLowerCase() === this._tagFilter.toLowerCase());
    }

    renderPlans(targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        targetElement.innerHTML = ''; // Clear existing content
        this._plansList.forEach(planData => { // Slice the first 6 elements
            const plan = new Plan(planData);
            targetElement.appendChild(plan.render());
        });
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.jsonbin.io/v3/b/6543a6a454105e766fca6fa1";
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    const planRenderer = new PlanRenderer(apiUrl, tagFilter);
    planRenderer.fetchAndRenderPlaces('.plans'); // Make sure the '.plans' selector exists in your HTML
});
