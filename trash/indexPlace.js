// class Place {
//     constructor(data) {
//         this.image = data.image;
//         this.name = data.name;
//         this.category = data.category;
//         this.address = data.address;
//         this.hours = data.hours;
//         this.buttonText = data.buttonText;
//     }

//     render() {
//         return `<article class="subNewPlaces">
//                   <div class="image">
//                       <img src="${this.image}" alt="${this.name}">
//                   </div>
//                   <div class="details">
//                       <h3>${this.name}</h3>
//                       <p>${this.category}</p>
//                       <address>${this.address}</address>
//                       <i class="far fa-clock"></i>
//                       <time>${this.hours}</time><br>
//                       <a href="./place.html"><button><span>${this.buttonText}</span></button></a>
//                   </div>
//               </article>`;
//     }
// }

// class PlaceRenderer {
//     constructor(apiUrl, categoryFilter) {
//         this._placesList = [];
//         this._apiUrl = apiUrl;
//         this._categoryFilter = categoryFilter;
//     }

//     async fetchAndRenderPlaces(targetElement) {
//         try {
//             const response = await fetch(this._apiUrl);
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
    
//             const data = await response.json();
    
//             if (data && Array.isArray(data.record)) {
//                 this._placesList = this.filterPlacesByCategory(data.record);
//                 this.renderPlaces(targetElement);
//             } else {
//                 console.error('Error: Expected an array of records in the response');
//             }
//         } catch (error) {
//             console.error('Error fetching or parsing data:', error.message);
//         }
//     }
    

//     filterPlacesByCategory(placesData) {
//         if (!this._categoryFilter) {
//             return placesData;
//         }
//         return placesData.filter(place => place.category.toLowerCase() === this._categoryFilter.toLowerCase());
//     }

//     renderPlaces(targetElement) {
//         const container = document.querySelector(targetElement);
//         const fragment = document.createDocumentFragment();

//         this._placesList.slice(0, 6).forEach(placeData => {
//             const place = new Place(placeData);
//             const temp = document.createElement('div');
//             temp.innerHTML = place.render();
//             fragment.appendChild(temp.firstChild);
//         });

//         container.replaceChildren(fragment);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const categoryFilter = urlParams.get('category');
//     const apiUrl = "https://api.jsonbin.io/v3/b/65449c0554105e766fcac45f";
//     const placeRenderer = new PlaceRenderer(apiUrl, categoryFilter);
//     placeRenderer.fetchAndRenderPlaces('.newPlaces');
// });
