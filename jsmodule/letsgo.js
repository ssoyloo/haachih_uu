class Plan {
    constructor(data) {
        this.name = data.name;
        this.image = data.image;
        this.tag = data.category;
        this.address = data.address;
        this.buttonText = data.buttonText;
        this.stars = data.stars;
        this.stars=data.stars;
        this.countPeople=data.countPeople;
        this.introduction=data.introduction;
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
              <button onclick='changeColor()' class="like"><i class="fa-regular fa-heart"></i></button>
              <div class="info">
                <p class="tag">
                  <i class="fa-solid fa-tag"></i>
                  ${this.tag}
                </p>
                <address class="addr">
                  <i class="fa-solid fa-location-dot"></i>
                  ${this.address}
                </address>
                
                <a href="11326020" class="phone"
                  ><i class="fa-solid fa-phone"></i>11326020
                </a>
                <p>Хүний багтаамж: ${this.countPeople}</p>
              </div>
              <p>
                ${this.introduction}
                </p>
              <a href="./place.html" class="delgerengui"
                ><span>${this.buttonText}</span>K-c эхэлье</a
              >
            </div>
        `;
        return article;
    }
  }
  
  class PlanRenderer {
    constructor(apiUrl, tagFilter, huniiTooFilter) {
        this._plansList = [];
        this._apiUrl = apiUrl;
        this._tagFilter = tagFilter;
        this._huniiTooFilter=huniiTooFilter;
    }
  
    fetchAndRenderPlaces(targetSelector) {
        fetch(this._apiUrl)
            .then(response => response.json())
            .then(data => {
                    this._plansList = this.filterPlacesBy(data.record);
                    this.renderPlans(targetSelector);
            })
            .catch(error => {
                console.error('Error fetching places data:', error);
            });
    }
  
    filterPlacesBy(placesData) {
        if (!this._huniiTooFilter) {
            return placesData;
        }
        return placesData.filter(place => {
          const huniiTooMatch = !this._huniiTooFilter || place.countPeople === this._huniiTooFilter;
          // const oirhonGazarMatch = !this._oirhonGazarFilter || place.oirhonGazar === this._oirhonGazarFilter;
          const typeMatch = !this._typeFilter || place.tag.toLowerCase() === this._typeFilter.toLowerCase();
          return  huniiTooMatch && typeMatch ;
      });
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
    const apiUrl = "https://api.jsonbin.io/v3/b/65642e6812a5d376599f7004";
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');
    const huniiTooFilter=urlParams.get('countPeople');
    const planRenderer = new PlanRenderer(apiUrl, tagFilter, huniiTooFilter);
    planRenderer.fetchAndRenderPlaces('.result');
  });
  
  