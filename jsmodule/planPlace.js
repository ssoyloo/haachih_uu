

class Place {
    constructor(data) {
        this.image = data.image;
        this.title = data.title;
        this.category = data.category;
        this.address = data.address;
        this.hours = data.hours;
        this.buttonText = data.buttonText;
        this.numberList=1;
    }
    render() {
        return `<article class="subplan-grid">
                        
                <h2 class="Bignumber">${this.numberList}</h2>
                <img class="PlanPhoto" src="${this.image}" alt="bla">
                <article class="plan-detials">
                <h3>${this.title}</h3>
                <p>${this.category}</p>
                <meter id="gazar1" value="5" min="0" max="5">5 out of 5</meter>

                <address>${this.address}</address>
                <p><time datetime="2023-02-08">00:00</time>-<time>${this.hours}</time></p>
                <a href="11326020">11326020</a>
                <h4>Танилцуулга</h4>
                <p>Янзын хөөрхөн төлөвлөгөө байна. Үнэхээр зугаатай байлаа</p>
                <a href="./plan.html"><button><span>${this.buttonText}</span>-c эхэлье </button></a>
                </article>
            </article >`;
    }
}

class PlaceRenderer {
    constructor(apiUrl, categoryFilter) {
        this._placesList = [];
        this._apiUrl = apiUrl;
        this._categoryFilter = categoryFilter;
    }

    fetchAndRenderPlaces(targetElement) {
        fetch(this._apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.record)) {
                    this._placesList = this.filterPlacesByCategory(data.record);
                    this.renderPlaces(targetElement);
                } else {
                    console.error('Error: Expected an array of records in the response');
                }
            })
            .catch(error => {
                console.error('Error fetching places data:', error);
            });
    }

    filterPlacesByCategory(placesData) {
        if (!this._categoryFilter) {
            return placesData;
        }
        return placesData.filter(place => place.category.toLowerCase() === this._categoryFilter.toLowerCase());
    }

    renderPlaces(targetElement) {
        const container = document.querySelector(targetElement);
        container.innerHTML = ''; // Clear the container first
        this._placesList.slice(0, 3).forEach(placeData => {
            const place = new Place(placeData);
            container.insertAdjacentHTML('beforeend', place.render());
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const apiUrl = "https://api.jsonbin.io/v3/b/65449c0554105e766fcac45f";
    const placeRenderer = new PlaceRenderer(apiUrl, categoryFilter);
    placeRenderer.fetchAndRenderPlaces('.leftsection');
});
