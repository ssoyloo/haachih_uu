

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
        return `
        <p class="time"><time datetime="2023-02-08">00:00</time>-<time>23:59</time></p>
                    <li>
                        <article class="subplan-grid">
                            <img class="PlanImage" src="zurag/park.jpeg" alt="bla">
                            <div class="PlanInfo">
                                <h3>Хүүхдийн парк</h3>
                                <p class="tag"><i class="fa-solid fa-tag"></i> Хүрээлэн</p>
                                <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i><span>2.5</span></meter>
                                <address><i class="fa-solid fa-location-dot"></i>СБД, 1-р хороо</address>
                                <a class="phone" href="11326020"><i class="fa-solid fa-phone"></i>11326020</a>
                                <p class="timen"><i class="fa-regular fa-clock"></i><time datetime="2023-02-08">00:00</time>-<time>23:59</time></p>
                                <h4>Танилцуулга: </h4>
                                <p class="intro">Янзын хөөрхөн төлөвлөгөө байна. Үнэхээр зугаатай байлаа.</p>
                                <button class="value"><span>100</span>K-c эхэлье</button>
                            </div>
                        </article>
                    </li>
        `;
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
        this._placesList.slice(0, 5).forEach(placeData => {
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
