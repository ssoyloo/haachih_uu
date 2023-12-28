class Place {
    constructor(data) {
        this.name = data.name;
        this.image = data.image;
        this.tag = data.category;
        this.address = data.address;
        this.hours = data.hours; //tsagiin huvaari
        this.buttonText = data.buttonText; //ehlehe une
        this.stars = data.stars;
        this.countPeople=data.countPeople; //hunii bagtaamj
        this.introduction=data.introduction;
        this.phone=data.phone;
        this.freewifi = data.freewifi;
        this.parking = data.parking;
        this.noice = data.noice;
        this.VIProom = data.VIProom;
        this.microphone = data.microphone;
        this.speaker = data.speaker;
    }
  
    render() {
      const article = document.createElement('article');
      article.classList.add('item');
      article.innerHTML = `
          <img src="${this.image}" alt="${this.name}" />
          <div class="information">
              <h3>${this.name}</h3>
              
              <meter value="0.85" min="0.0" max="5.0">
                  <i class="fa-solid fa-star"></i> <span>${this.stars}</span>
              </meter>
              
              <add-place-card></add-place-card>
              
              <div class="info">
                  <p class="tag">
                      <i class="fa-solid fa-tag"></i>
                      ${this.tag}
                  </p>
                  
                  <address class="addr">
                      <i class="fa-solid fa-location-dot"></i>
                      ${this.address}
                  </address> 

                  <a href="tel:${this.phone}" class="phone">
                      <i class="fa-solid fa-phone"></i>${this.phone}
                  </a>
                  <p>Хүний багтаамж: ${this.countPeople}</p>
              </div>
              
              <p>${this.introduction}</p>
              <a href="./place.html" class="delgerengui">
                  <span>${this.buttonText}</span>K-c эхэлье
              </a>
          </div>
      `;
      return article;
  }
}

class PlaceRenderer {
  constructor(apiUrl, tagFilter, huniiTooFilter, oirhonGazarFilter, typeFilter) {
      this._placesList = [];
      this._apiUrl = apiUrl;
      this._tagFilter = tagFilter;
      this._huniiTooFilter = huniiTooFilter;
      this._oirhonGazarFilter = oirhonGazarFilter; // Add oirhonGazarFilter here
      this._typeFilter = typeFilter;
  }

  fetchAndRenderPlaces(targetSelector) {
      fetch(this._apiUrl)
          .then(response => response.json())
          .then(data => {
              this._placesList = this.filterPlacesBy(data.record);
              this.renderPlaces(targetSelector);
          })
          .catch(error => {
              console.error('Error fetching places data:', error);
          });
  }

  filterPlacesBy(placesData) {
    if (!this._huniiTooFilter && !this._oirhonGazarFilter && !this._typeFilter) {
        return placesData;
    }

    return placesData.filter(place => {
        const huniiTooMatch = !this._huniiTooFilter || place.countPeople >= parseInt(this._huniiTooFilter, 10);
        const oirhonGazarMatch = !this._oirhonGazarFilter || place.address.includes(this._oirhonGazarFilter);
        const typeMatch = !this._typeFilter || place.category.toLowerCase() === this._typeFilter.toLowerCase();
        return huniiTooMatch && oirhonGazarMatch && typeMatch;
    });
}
 
  renderPlaces(targetSelector) {
      const targetElement = document.querySelector(targetSelector);
      targetElement.innerHTML = '';
      this._placesList.forEach(placeData => {
          const place = new Place(placeData);
          targetElement.appendChild(place.render());
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = "https://api.jsonbin.io/v3/b/658bcbe8dc746540188951e3";
  const urlParams = new URLSearchParams(window.location.search);
  const tagFilter = urlParams.get('tag');
  const huniiTooFilter = urlParams.get('countPeople');
  const oirhonGazarFilter = urlParams.get('address');
  const typeFilter = urlParams.get('category');
  const placeRenderer = new PlaceRenderer(apiUrl, tagFilter, huniiTooFilter, oirhonGazarFilter, typeFilter);
  placeRenderer.fetchAndRenderPlaces('.result');
});