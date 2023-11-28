//planPlace.js
class Place {
    constructor(data) {
        this.image = data.image;
        this.title = data.name; 
        this.category = data.category;
        this.address = data.address;
        this.hours = data.hours;
        this.buttonText = data.buttonText;
        this.planName = data.planName;
    }
    render() {
        return `     
                <p class="time"><time datetime="2023-02-08">${this.hours}</time></p>
                    <article class="subplan-grid">
                        <img class="PlanImage" src="${this.image}" alt="${this.title}">
                        <div class="PlanInfo">
                            <h3>${this.category}</h3>
                            <p class="tag"><i class="fa-solid fa-tag"></i> ${this.category}</p>
                            <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i><span>2.5</span></meter>
                            <address><i class="fa-solid fa-location-dot"></i>${this.address}</address>
                            <a class="phone" href="11326020"><i class="fa-solid fa-phone"></i>11326020</a>
                            <p class="timen"><i class="fa-regular fa-clock"></i><time datetime="2023-02-08">${this.hours}</time></p>
                            <h4>Танилцуулга: </h4>
                            <p class="intro">Янзын хөөрхөн төлөвлөгөө байна. Үнэхээр зугаатай байлаа.</p>
                            <a href='../place.html'><button class="value"><span>${this.buttonText}</span>К-с эхэлнэ</button></a>          
                        </div>
                    </article>
        `;
    }
}

class PlaceRenderer {
    constructor(apiUrl, planNameFilter) {
        this._placesList = [];
        this._apiUrl = apiUrl;
        this._planNameFilter = planNameFilter;
    }

    fetchAndRenderPlaces(targetElement) {
        fetch(this._apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data); 
                    if (data && Array.isArray(data.record)) {
                        this._placesList = this.filterPlacesByPlanName(data.record);
                        this.renderPlaces(targetElement);
                    } else {
                        console.error('Error: Expected an array of records in the response');
                    }
                })
                .catch(error => {
                    console.error('Error fetching places data:', error);
                });

    }

    filterPlacesByPlanName(placesData) {
        if (!this._planNameFilter) {
            return placesData;
        }
    
        const lowerCaseFilter = this._planNameFilter.toLowerCase();
        return placesData.filter(place => place.planName.toLowerCase().includes(lowerCaseFilter));
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
    const planNameFilter = urlParams.get('planName');
    console.log('Plan Name Filter:', planNameFilter); // Check the value in the console

    const apiUrl = "https://api.jsonbin.io/v3/b/65642e7854105e766fd5f6fd";
    const placeRenderer = new PlaceRenderer(apiUrl, planNameFilter);
    placeRenderer.fetchAndRenderPlaces('.leftsection');
});
