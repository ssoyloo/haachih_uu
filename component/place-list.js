class PlaceList extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.places = []; 
  }

  connectedCallback() {
    const topPlace=this.getAttribute('topplace')
    const Styletype=this.getAttribute('style')
    const topCount = parseInt(topPlace);
    this.fetchPlaces(topCount, Styletype); 
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected-category' && oldValue !== newValue) {
      this.fetchPlaces(); 
    }
  }

  async fetchPlaces(topCount, Styletype) { 
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/658bcbe8dc746540188951e3`);

      
      if (response.status === 429) {
        console.warn('API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset.');
        return;
      }

      const data = await response.json();
      this.places = data.record || [];
      this.render(topCount, Styletype);
    } catch (error) {
      console.error('Error fetching places:', error); 
    }
  }

  render(topCount, Styletype) {
    const places = this.places.slice(0, topCount) || [];
    let styleTemplate = ''; 
    if (Styletype == 'gridhiineshuu') {
      styleTemplate = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
  <link rel="stylesheet" href="../css/general.css">
  <style>
    h2 {
      margin: 3rem;
      font-size: 24px;
      color: #333;
      text-align: center;
    }

    .placesToRecommend {
      display: grid;
      grid-row: auto;
      grid-template-columns: 50% 50%;
      align-items: center;
      gap:3rem;
    }

    .subRecommend{
      max-width: 93%;
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
    }

    .subNewPlaces img{
      height: 100%;
      width: auto;
      border-radius: 1rem;
    }

    .subNewPlaces {
      border: 1px solid #ddd;
      display: flex;
      max-width: 100%;
      border-radius: 20px;
      max-height: 13rem;
    }

    .subNewPlaces .image {
      flex: 1;
      max-width: 40%;
    }

    .subNewPlaces .addToCard {
      position: absolute;
      background: none;
      border: none;
      width: 1.8rem;
      height: 1.8rem;
      background-color: #e7e7e7;
      border-radius: 0.5rem;
      margin-left: -2.5rem;
      margin-top: 0.8rem;
    }

    .subNewPlaces .addToCard i {
      color: #000;
    }

    .subNewPlaces .addToCard:hover{
      background-color: #797777;
    }

    .subNewPlaces .details {
      flex: 1;
      margin: 1rem;
    }

    .subNewPlaces .details .value {
      margin-top: 2rem;
      text-align: center;
      border-radius: 0.5rem;
      transform: translateX(60%);
    }

    .subNewPlaces address, i, p, time {
      color:#555;
    }

    .addToCard .fa-heart {
      font-size: 1.3rem;
    }

    @media (max-width: 1400px) {
      .subNewPlaces img {
        height: 100%;
        width: auto;
      }

      .subNewPlaces .addToCard {
        width: 1.8rem;
        height: 1.8rem;
      }

      .subNewPlaces {
        display: flex;
        max-width: 100%;
        max-height: 1rem;
      }

      .subNewPlaces .image {
        flex: 1;
        max-width: 30%;
      }

      .subNewPlaces .details {
        flex: 1;
        margin: 1rem;
      }

      .subNewPlaces .details .value {
        margin-top: 2rem;
        text-align: center;
        border-radius: 0.5rem;
        transform: translateX(60%);
      }

      .subNewPlaces {
        max-height: auto;
      }

      .subNewPlaces .image {
        max-width: 100%;
      }

      .subNewPlaces .details .value {
        margin-top: 1rem;
      }
    }

    @media (max-width: 768px) {
      h2,  h3, .subNewPlaces h3 {
        font-size: 1.5rem;
      }

       p, .subNewPlaces p,
       address, .subNewPlaces address,
       time, .subNewPlaces time {
        font-size: 0.9rem;
      }

       .value, .subNewPlaces .value {
        font-size: 0.9rem;
        padding: 0.5rem;
      }

       .value {
        font-size: 0.8rem;
      }
    }
  </style>`;
    } else  {
      styleTemplate = `
        <style>
        .subRecommend {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 1rem;
          & .subNewPlaces {
              display: flex;
              background-color: #fff;
              border: 1px solid #ccc;
              max-width: 100%;
              border-radius: 20px;
              max-height: 100%;
              & .image {
                  flex: 1;
                  max-width: 300px;
              }
              & .details {
                  flex: 1;
                  margin: 1rem;
         
                  & .value{
                    margin-top: 2%;
                    text-align: center;
                    margin-left: 24%;
                    border-radius: 0.5rem;
                }
                 
              }
          }
          & .subNewPlaces img{
              height: 100%;
              width: auto;
              border-radius: 1rem;
          }
      }
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
      h2 {
        margin: 3rem;
          font-size: 24px;
          color: #333;
          text-align: center;
      }
      meter{
          height: 1.8rem;
      }
        </style>`;
    }
    this.shadowRoot.innerHTML = `
    ${styleTemplate}

      <section class='subRecommend'>
          ${places.map(place => `
          <article class="subNewPlaces">
          <div class="image">
              <img src="${place.image}" alt="${place.name}"> <!-- Change 'this.image' to 'place.image' -->
          </div>
          <div class="details">
          
              <h3>${place.name}</h3> <!-- Change 'this.name' to 'place.name' -->
              <add-place-card></add-place-card>
              <p>${place.category}</p> <!-- Change 'this.category' to 'place.category' -->
              <address>${place.address}</address> <!-- Change 'this.address' to 'place.address' -->
              <i class="far fa-clock"></i>
              <time>${place.hours}</time><br> <!-- Change 'this.hours' to 'place.hours' -->
              <a href="./place.html"><button class="value" ><span>${place.buttonText}</span>К -с эхэлнэ</button></a>
              
          </div>
      </article>
          `).join('')}
      </section>
    `;
  }

  handleAddToCart(place) { 
    this.dispatchEvent(new CustomEvent('add-to-cart', { detail: { place } }));
  }
}

customElements.define('place-list', PlaceList); 
