class PlanList extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.plans = [];
  }     

  connectedCallback() {
    this.fetchPlans();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected-category' && oldValue !== newValue) {
      this.fetchPlans();
    }
  }

  async fetchPlans() {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/65642e7854105e766fd5f6fd`);
      
      
      if (response.status === 429) {
        console.warn('API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset.');
        return;
      }
  
      const data = await response.json();
      this.plans = data.record || [];
      this.sortPlansByStars();
      this.render();
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }
  sortPlansByStars() {
    this.plans.sort((a, b) => b.stars - a.stars); 
    this.plans = this.plans.slice(0, 4); 
  }
  
  

  render() {
    const plans = this.plans || [];
  
    this.shadowRoot.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');
 
:root {
    --main-color: rgb(10,92,118);
    --secondary-color: rgb(41,151,185);
    --main-bg-color: #f8f8f8;
    --border-radius: 1rem;
    --button-border-radius: 1rem;
    --margin-side: 8rem;
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
        margin-bottom: 20px;
        font-size: 22px;
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
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
    }
    }
     
    p {
        color: #555;
        font-size: 14px;
    }
     
    .Lsearch {
        padding-top: 30rem;
        display: flex;
        text-align: center;
        overflow: hidden;
        margin-left: 30%;
        border-radius: 20px;
        width: 50%;
        margin: 2rem;
        margin-left: 25%;
        & select, button{
            flex: 1;
            font-size: 14px;
        }
        & select{
            width: 8rem;
            padding: 0.5rem;
            font-family: pangolin;
            color:#666666 ;
            background-color: #ffffff;
            opacity: 60%;
        }
        
        & button:hover {
            background-color: #0056b3;
        }
        & #huniiToo {
            border-radius: 20px 0 0 20px;
        }
        & .option1, .option2, .option3 {
            text-align: center;
            font-size: 16px;
            width: 10px;
            height: 50px;
            border-radius: var(--border-radius);
        }
      }
     
    
    button:hover {
        background-color: #0056b3;
    }
     
    .plan-container{

        & .plans {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            & .value{
              & button {
                border: none;
                border-radius: var(--border-radius);
                background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
                padding: 0.7em 0.7em;
                font-size: 1em;
            }
            } 
            & .PlanInfo {
                height:29rem;
                border: 1px solid #ccc;
                padding: 15px;
                background-color: #fff;
                transition: box-shadow 0.3s;
                max-width: 17rem; /* Set a maximum width */
                width: 100%; /* Fill available space */
                margin: 0 10px 20px; /* Add some margin for spacing */
                border-radius: 1rem;
            }
            & .PlanInfo:hover{
                background-color: #d0dce9;
                transition: 0.4s;
            }
            & button{
                margin-top: 2%;
            }
            & img{
                border-radius: 20px;
                height:14rem;
            }
        }
    }
      </style>
      <section class='plan-container'>
        <h2>Топ л гээд байгаам чинь</h2>
        <div class="plans">
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
