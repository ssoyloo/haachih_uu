class PlanList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.plans = [];
      this._selectedTag = null;
      this._selectedName = null;
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  
    connectedCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      this._selectedTag = urlParams.get('tag');
      this._selectedName = urlParams.get('planName');
  
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeMediaQuery.addListener(() => {
        this.darkMode = darkModeMediaQuery.matches;
        this.render();
      });
  
      this.fetchPlans();
    }   
  // toggleDarkMode() {
  //   this.darkMode = !this.darkMode;
  //   this.render();
  // }
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
      const response = await fetch(`https://api.jsonbin.io/v3/b/657d8960dc7465401883f81a`);
      
      
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
  
    this.shadowRoot.innerHTML = `
      <style>
      <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
      <link rel="stylesheet" href="../css/style.css">
      @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
 
      :root {
        --main-color: rgb(215, 97, 219);
        --secondary-color: rgb(112, 217, 249);
        --hover-color:rgb(98, 0, 123);
        --bg-light-color: #fff;
        --bg-dark-color:rgb(16, 12, 28);
        --border-radius: 1rem;
        --button-border-radius: 1rem;
        --margin-side: 8rem;
        --box-shadow: 0.1rem 0.2rem 0.3rem #bdbdbd;
    }
:host(.dark-theme) {
  background-color: #333;
  color: #fff;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body styles */
body {
  font-family: Pangolin;
}
/*Дэлгэцний гол хэсэг*/

/*Blogcard доторх зураг, товч, одны дизайн*/
article {
  margin-bottom: 1rem;
  border: none;
  box-shadow: 0.1rem 0.2rem 0.5rem #555;
  border-radius: var(--border-radius);
      & img {
      max-width: 100%;
      border-radius: var(--border-radius);
      }
      & h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 10px;
      }
      & .value {
          font-family: Pangolin;
          border: none;
          border-radius: var(--border-radius);
          background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-left: 2%;
          padding: 0.7em 0.7em;
          font-size: 1em;
          border-radius: 1rem;
      }
      & .value:hover{
          box-shadow: 0px 0px 0px 2.5px #fff, 0px 0px 0px 5px #0A5C76, 0px 0px 0px 10px white, 0px 0px 0px 10.5px #2FA2C6;
          background-image: none;
          background-color: #fff;
          color: #0A5C76;
          transition: 0.2s;
      }
      & .like{
          float: right;
          border: none;
          background-color: white;
      }
      & meter{
          text-align: center;
          position:relative;
          appearance: none;
          color: white;
          background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
          padding: 0.4rem;
          border-radius: 0.7rem;  
      }
}
meter{
  height: 1.8rem;
}
    main {
      width: 85%;
      margin: auto;
  }
   
  h2 {
    margin: 3rem;
      font-size: 24px;
      color: #333;
      text-align: center;
  }
   
   article {
      & img {
      max-width: 100%;
      border-radius: 1rem;
      margin-bottom: 2%;
      }
      & h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
  }
  }
   
  p {
      color: #555;
      font-size: 14px;
  }

  button:hover {
      background-color: #0056b3;
  }
   
  .plan-container{
   
    & .item {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        & .PlanInfo {
            border: 1px solid #ccc;
            background-color: #fff;
            max-width: 280px; /* Set a maximum width */
            width: 100%; /* Fill available space */
            margin: 0 10px 20px; /* Add some margin for spacing */
            border-radius: 1rem;
            background-color: ${this.darkMode ? '#555' : '#fff'};
                color: ${this.darkMode ? '#fff' : '#333'};
        & .title {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem;
            & meter {
                margin-top: -0.3rem;
                height: 100%;
            }
        }
        & address {
            color: #555;
            font-size: 14px;
            margin-left: 1.5rem;
        }
        & p {
            margin-left: 1.5rem;
            margin-bottom: 0.5rem;
        }
        & .PlanInfo:hover{
            background-color: #d0dce9;
            transition: 0.4s;
        }
        & button{
            margin-top: 2%;
            border-radius: 0.5rem;
            margin: 0.8rem ;
            margin-left: 4.7rem;
        }
    }
}
}
         
      </style>
      <section class='plan-container'>
        
        <div class="item">
          ${plans.map(plan => `
            <article class='PlanInfo'>
              <img src="${plan.image}" alt="${plan.title}" />
              <div class="title">
                <h3>${plan.title}</h3>
                <meter value="${plan.stars}" min="0.0" max="5.0">
                  <i class="fa-solid fa-star"></i> <span>${plan.stars}</span>
                </meter>
              </div>
              <p><i class="fa-solid fa-tag"></i>${plan.tag}</p>
              <add-to-card></add-to-card>
              <address>
                <i class="fa-solid fa-location-dot"></i>${plan.location}
              </address>
              <a href="./plan.html?planName=${plan.title}&tag=${plan.tag}">
                <button class="value"><span>${plan.buttonText}</span>-c эхэлье</button>
              </a>
              
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('plan-list', PlanList);
