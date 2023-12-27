
// class Plan {
//     constructor(data) {
//         this.title = data.title;
//         this.image = data.image;
//         this.evaluation = data.evaluation;
//         this.tag = data.tag;
//         this.location = data.location;
//         this.buttonText = data.buttonText;
//         this.place1 = data.place1;
//         this.place2 = data.place2;
//         this.place3 = data.place3;
//         this.place4 = data.place4;
//         this.place5 = data.place5;
//         this.stars = data.stars; 
//         this.id = data.id;
//     }

//     render() {        
//         const article = document.createElement('article');
//         article.classList.add('planResult');
//         article.innerHTML = `
//         <figure class="PlanImage">
//         <img src="zurag/ubnight.jpeg" alt="bla" />
//         <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i> <span>4</span></meter>
//     </figure>
//     <figure class="PlanInfo">
//         <button class="like"><i class="fa-regular fa-heart fa-2xl"></i></button>
//         <h3>Төлөвлөгөө 1</h3>
//         <p><i class="fa-solid fa-tag"></i> Орой яахын?</p>
//         <address><i class="fa-solid fa-location-dot"></i> СБД, 1-р хороо - УБ, Сөүл гудамж </address>
//         <p><i class="fa-regular fa-clock"></i> <time datetime="2023-02-08">7:30</time>-<time>21:00</time></p>
//         <ol>
//             <li>Паб, лоунж</li>
//             <li>Клаб</li>
//             <li>Караоке</li>
//         </ol>
//         <button class="value"><span>100</span>K-c эхэлье</button>
//     </figure>
//         `;
//         const likeButton = article.querySelector('.like');

//             likeButton.addEventListener('click', () => {
//                 if (likeButton.style.color === 'red') {
//                     likeButton.style.color = 'black';
//                 } else {
//                     likeButton.style.color = 'red';
//                 }
                
//             });


//         return article;
//     }
// }

// class PlanRenderer {
//     constructor(apiUrl, tagFilter) {
//         this._plansList = [];
//         this._apiUrl = apiUrl;
//         this._tagFilter = tagFilter;
//         let plansInFav;
//     }

//     fetchAndRenderPlaces(targetSelector) {
//         fetch(this._apiUrl)
//             .then(response => response.json())
//             .then(data => {
//                     this._plansList = this.filterPlacesByTag(data.record);
//                     this.renderPlans(targetSelector);
//             })
//             .catch(error => {
//                 console.error('Error fetching places data:', error);
//             });
//     }

//     filterPlacesByTag(placesData) {
//         if (!this._tagFilter) {
//             return placesData;
//         }
//         return placesData.filter(place => place.tag.toLowerCase() == this._tagFilter.toLowerCase());
//     }

//     renderPlans(targetSelector) {
//         const targetElement = document.querySelector(targetSelector);
//         targetElement.innerHTML = ''; 
//         this._plansList.forEach(planData => {
//             const plan = new Plan(planData);
//             targetElement.appendChild(plan.render());
//         });
//     }

// }

// document.addEventListener('DOMContentLoaded', () => {
//     const apiUrl = "https://api.jsonbin.io/v3/b/6543a6a454105e766fca6fa1";
//     const urlParams = new URLSearchParams(window.location.search);
//     const tagFilter = urlParams.get('tag');
//     const planRenderer = new PlanRenderer(apiUrl, tagFilter);
//     planRenderer.fetchAndRenderPlaces('.plans');
// });
