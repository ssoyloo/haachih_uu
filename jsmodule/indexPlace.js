class Place {
    constructor(data) {
        this.image = data.image;
        this.title = data.title;
        this.category = data.category;
        this.address = data.address;
        this.hours = data.hours;
        this.buttonText = data.buttonText;
    }

    render() {
        return `<article class="subNewPlaces">
                  <div class="image">
                      <img src="${this.image}" alt="${this.title}">
                  </div>
                  <div class="details">
                      <h3>${this.title}</h3>
                      <p>${this.category}</p>
                      <address>${this.address}</address>
                      <time>${this.hours}</time><br>
                      <button><span>${this.buttonText}</span></button>
                  </div>
              </article>`;
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
        this._placesList.slice(0, 6).forEach(placeData => {
            const place = new Place(placeData);
            container.insertAdjacentHTML('beforeend', place.render());
        });
    }
}
replacechildren function ashigla genee 

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const apiUrl = "https://api.jsonbin.io/v3/b/65449c0554105e766fcac45f";
    const placeRenderer = new PlaceRenderer(apiUrl, categoryFilter);
    placeRenderer.fetchAndRenderPlaces('.newPlaces');
});
