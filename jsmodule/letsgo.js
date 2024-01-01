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
      article.classList.add('subNewPlace');
      article.innerHTML = `
          <img src="/sura.jpg" alt="${this.name}" />
          <div class="information">
              <h3>${this.name}</h3>
             
              <meter value="0.85" min="0.0" max="5.0">
                  <i class="fa-solid fa-star"></i> <span>${this.stars}</span>
              </meter>
             
         
             
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
  constructor(apiUrl, tagFilter, huniiTooFilter, oirhonGazarFilter, typeFilter, starFilter, detailFilter) {
      this._placesList = [];
      this.firstPlaceList=[];
      this._apiUrl = apiUrl;
      this._tagFilter = tagFilter;
      this._huniiTooFilter = huniiTooFilter;
      this._oirhonGazarFilter = oirhonGazarFilter; // Add oirhonGazarFilter here
      this._starFilter = starFilter;
      this._detailFilter = detailFilter;
      this._typeFilter = typeFilter;
  }
 
  fetchAndRenderPlaces(targetSelector) {
      fetch(this._apiUrl)
          .then(response => response.json())
          .then(data => {
              this.firstPlaceList = this.filterPlacesBy(data.record);
              console.log(this.firstPlaceList);
              this._placesList=this.filterBySide(this.firstPlaceList);
              console.log(this._placesList)
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
        const typeMatch = !this._typeFilter || place.category.toLowerCase() == this._typeFilter.toLowerCase();
        return huniiTooMatch && oirhonGazarMatch && typeMatch;
    });
}




filterBySide(firstPlaceList){
    if (!this._starFilter && !this._detailFilter){
        return firstPlaceList;
    }
    return firstPlaceList.filter(place =>{
        const starMatch = !this._starFilter.length || this._starFilter.includes(place.stars.toString());
        const detailMatch = !this._detailFilter.length ||
                (this._detailFilter.includes('freewifi') && place.freewifi) ||
                (this._detailFilter.includes('parking') && place.parking) ||
                (this._detailFilter.includes('noice') && place.noice) ||
                (this._detailFilter.includes('VIProom') && place.VIProom) ||
                (this._detailFilter.includes('microphone') && place.microphone) ||
                (this._detailFilter.includes('speaker') && place.speaker);
       
        return starMatch && detailMatch;
 
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
    const apiUrl = "https://api.jsonbin.io/v3/b/65925eb5266cfc3fde710003";
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    const huniiTooFilter = urlParams.get('countPeople');
    const oirhonGazarFilter = urlParams.get('address');
    const typeFilter = urlParams.get('category');
    const starFilter = urlParams.get('star');
    const detailFilter =urlParams.get('detail');
    const placeRenderer = new PlaceRenderer(apiUrl, tagFilter, huniiTooFilter, oirhonGazarFilter, typeFilter, starFilter, detailFilter);
    placeRenderer.fetchAndRenderPlaces('.result');
});