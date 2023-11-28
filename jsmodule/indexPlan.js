class Plan {
  constructor(data) {
      this.title = data.title;
      this.image = data.image;
      this.evaluation = data.evaluation;
      this.tag = data.tag;
      this.location = data.location;
      this.buttonText = data.buttonText;
      this.stars = data.stars;
  }

  render() {
      const article = document.createElement('article');
      article.classList.add('subPlans');
      article.innerHTML = `
            <img
              src="${this.image}"
              alt="${this.title}"
            />
            <div class="title">
              <h3>${this.title}</h3>
              <meter value="0.85" min="0.0" max="5.0">
                <i class="fa-solid fa-star"></i> <span>${this.stars}</span>
              </meter>
            </div>
            <p><i class="fa-solid fa-tag"></i>Орой яахын?</p>
            <address>
              <i class="fa-solid fa-location-dot"></i>${this.location}
            </address>
            <a href="./plan.html?planName=${this.title}&tag=${this.tag}"" ><button class="value"><span>${this.buttonText}</span>-c эхэлье</button></a>
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

  filterPlacesByTag(plansData) {
      if (!this._tagFilter) {
          return plansData;
      }
      return plansData.filter(plan => plan.tag.toLowerCase() === this._tagFilter.toLowerCase());
  }

  renderPlans(targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    targetElement.innerHTML = ''; // Clear existing content

    this._plansList.sort((a, b) => b.stars - a.stars);
    this._plansList.slice(0, 4).forEach(planData => {
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
  planRenderer.fetchAndRenderPlaces('.plans');
});

