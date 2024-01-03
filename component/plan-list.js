class PlanList extends HTMLElement {
    constructor() {
      super();
      this.myRoot= this.attachShadow({ mode: 'open' });
      this.plans = [];
      this._selectedTag = null;
      this._selectedName = null;
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  
    connectedCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      this._selectedTag = urlParams.get('tag');
      this._selectedName = urlParams.get('planName');
      this.myRoot.innerHTML = ''; 
      this.fetchPlans();
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeMediaQuery.addListener(() => {
        this.darkMode = darkModeMediaQuery.matches;
        this.render();
      });
    }   
  static get observedAttributes() {
    return ['selected-tag'];
  }
  static get observedAttributes() {
    return ['selected-planName'];
  }

 
  

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected-tag' && oldValue !== newValue) {
      this._selectedTag = newValue;
      this.fetchPlans();
    }
    if (name === 'selected-planName' && oldValue !== newValue) {
      this._selectedName = newValue;
      this.fetchPlans();
    }
  }

  async fetchPlans() {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/65925efbdc746540188b74a9`);
      
      
      if (response.status === 429) {
        console.warn('API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset.');
        return;
      }
  
      const data = await response.json();
      this.plans = data.record || [];
      this.sortPlansByStars();
      this.filterPlansByName();
      this.filterByTagName();
      if(this.plans.length==0){
        console.log('zero');
        const notify=document.querySelector('.sayNothing');
        console.log(notify);
        notify.innerHTML = '<h2>Here are no similar plans.</h2>';
      }
      this.render();
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }
  sortPlansByStars() {
    this.plans.sort((a, b) => b.stars - a.stars); 
    this.plans = this.plans.slice(0, 4); 
  }
  filterPlansByName() {
    if (this._selectedName) {
        this.plans = this.plans.filter(plan =>
            (this._selectedName ? plan.title.toLowerCase() !== this._selectedName.toLowerCase() : true)
        );
    }
}
filterByTagName(){
  if(this._selectedTag){
    this.plans = this.plans.filter(plan =>
      (this._selectedTag ? plan.tag.toLowerCase() == this._selectedTag.toLowerCase() : true) 
  );
  }
}

  
  

  render() {
    const plans = this.plans || [];
    const themeClass = this.darkMode ? 'dark-theme' : 'light-theme';
    
    this.myRoot.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      <link rel="stylesheet" href="/general.css">
      <style>
        h2 {
          margin: 3rem;
          font-size: 1.5rem;
          color: var(--h-color);
          text-align: center;
        }
 
        article {
          & img {
            max-width: 100%;
            border-radius: 1rem;
            margin-bottom: 2%;
            position: relative;
           }
          & h3 {
            font-size: 1.2rem;
            color: var(--h-color);
            margin-bottom: 1.1rem;
          }
        }
   
        p {
          color: var(--h-color);
          font-size: 0.8rem;
        }
 
        button:hover {
            background-color: var(--main-color);
        }
 
        .plan-container{
          background-color: ${this.darkMode ? "var(--bg-dark-color)" : "#fff"};
          & .item {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              flex-wrap: wrap;
              & .PlanInfo {
                  border: 1px solid var(--deactive-star-color);
                  background-color: var(--bg-light-color);
                  max-width: 16rem;
                  width: 100%;
                  margin: 0 0.8rem 1.6rem;
                  border-radius: 1rem;
                  background-color: ${this.darkMode ? "var(--h-color)" : "var(--bg-light-color)"};
                      color: ${this.darkMode ? "var(--bg-light-color)" : "var(--p-color)"};
              & .title {
                  display: flex;
                  justify-content: space-between;
                  padding: 0.8rem;
                  & meter {
                      margin-top: -0.3rem;
                      height: 100%;
                  }
                  & img {
                    position: relative;
                  }
              }
              & address {
                  color: var(--p-color);
                  font-size: 0.8rem;
                  margin-left: 1.5rem;
              }
              & p {
                  margin-left: 1.5rem;
                  margin-bottom: 0.5rem;
              }
              & .PlanInfo:hover{
                  background-color: var(--bg-dark-color);
                  transition: 0.4s;
              }
              & .value{
                  transform: translateX(55%);
                  border-radius: 0.5rem;
                  margin: 0.8rem ;
                  right: 50%;
              }
          }
      }
 
      .addToCard {
        position: absolute;
        background: none;
        border: none;
        color: var(--bg-dark-color);
        width: 1.8rem;
        height: 1.8rem;
        background-color: var(--p-color);
        border-radius: 0.5rem;
        margin-left: -2.3rem;
        margin-top: 0.5rem;
      }
      .addToCard .fa-heart {
        font-size: 1.3rem;
      }
      .addToCard:hover{
        background-color: var(-main-color);
      }  
      </style>
      <section class='plan-container'>
        
        <div class="item">
          ${plans.map(plan => `
            <article class='PlanInfo'>
              <img src="${plan.image}" alt="${plan.title}" />
              <div class="title">
                <h3>${plan.title}</h3>
                <add-to-card></add-to-card>
                <meter value="${plan.stars}" min="0.0" max="5.0">
                  <i class="fa-solid fa-star"></i> <span>${plan.stars}</span>
                </meter>
              </div>
              <p><i class="fa-solid fa-tag"></i>${plan.tag}</p>
              
              <address>
                <i class="fa-solid fa-location-dot"></i>${plan.location}
              </address>
              <a href="./plan?planName=${plan.title}&tag=${plan.tag}">
                <button class="value"><span>${plan.buttonText}</span>-c эхэлье</button>
              </a>
              
            </article>
          `).join('')}
        </div>
      </section>
    `;

    plans.forEach((plan, index) => {
      const starsContainer = this.myRoot.querySelector(`.item .PlanInfo:nth-child(${index + 1}) .title .stars-container`);
      const star = new PlanStars({ stars: plan.stars });
      star.render(starsContainer);
    });
  }
}

customElements.define('plan-list', PlanList);
