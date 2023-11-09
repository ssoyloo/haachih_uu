class Plan {
  constructor(data) {
      this.title = data.title;
      this.image = data.image;
      this.evaluation = data.evaluation;
      this.tag = data.tag;
      this.location = data.location;
      this.buttonText = data.buttonText;
  }

  render() {
      const article = document.createElement('article');
      article.classList.add('subPlans');
      article.innerHTML = `
          <img src="${this.image}" alt="top ${this.title}">
          <h3>${this.title}</h3>
          <meter value="${this.evaluation / 100}" min="0.0" max="1.0">${this.evaluation}%</meter>
          <i class="fa-solid fa-tag"></i>
          <p>${this.tag}</p>
          <i class="fa-solid fa-location-dot"></i>
          <address>${this.location}</address>
          <a href="./plan.html?category=Category1"><button><span>${this.buttonText}</span>-с эхлэнэ</button></a>
      `;
      return article;
  }
}

class PlanRenderer {
            constructor() {
                this.plansSection = document.querySelector('.plans');
                this.codeExecuted = false;
            }

            renderPlans(plansData) {
              if (!this.codeExecuted) {
                  this.codeExecuted = true;
                  // Loop up to 4 times or until there are no more plans to render
                  for (let i = 0; i < Math.min(4, plansData.length); i++) {
                      const planData = plansData[i];
                      if (planData) { // Check if the planData is defined
                          const plan = new Plan(planData);
                          this.plansSection.appendChild(plan.render());
                      }
                  }
              }
          }




          fetchPlansData(apiUrl) {
            fetch(apiUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                if (data && Array.isArray(data.record)) {
                  this.renderPlans(data.record);
                } else {
                  console.error('Error: Expected an array of records in the response');
                }
              })
              .catch(error => {
                console.error('Error fetching plans data:', error);
                this.codeExecuted = false; 
              });
          }
          isValidPlanData(planData) {
            const requiredFields = ['title', 'image', 'evaluation', 'tag', 'location', 'buttonText'];
            return requiredFields.every(field => planData[field] !== undefined);
          }
}


document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = "https://api.jsonbin.io/v3/b/6543a6a454105e766fca6fa1";
  const planRenderer = new PlanRenderer();
  planRenderer.fetchPlansData(apiUrl);
});

