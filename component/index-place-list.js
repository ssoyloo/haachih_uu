class PlaceList extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.places = []; 
  }

  connectedCallback() {
    this.fetchPlaces(); 
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected-category' && oldValue !== newValue) {
      this.fetchPlaces(); 
    }
  }

  async fetchPlaces() { 
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/657d8988dc7465401883f827`);

      
      if (response.status === 429) {
        console.warn('API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset.');
        return;
      }

      const data = await response.json();
      this.places = data.record || [];
      this.render();
    } catch (error) {
      console.error('Error fetching places:', error); 
    }
  }

  render() {
    const places = this.places.slice(0, 6) || [];

    this.shadowRoot.innerHTML = `
      <style>
      .newPlaces {
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
      </style>
      <h2>Шинээр нэмэгдсэн</h2>
      <section class='newPlaces'>
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
