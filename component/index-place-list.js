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
      const response = await fetch(`https://api.jsonbin.io/v3/b/65642e6812a5d376599f7004`);

      
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
        gap: 10px;
        & .subNewPlaces {
            display: flex;
            background-color: #fff;
            border: 1px solid #ccc;
            max-width: 500px;
            border-radius: 20px;
            & .image {
                padding: 15px;
                flex: 1;
                border-radius: 20px;/* Set a maximum width for the image side */
                & img{
                    height: 90%;
                    width: 90%;
                    border-radius: 20px;
                }
            }
            & .details {
                flex: 1;
                padding: 15px;
                text-align: center;
                & button{
                    margin-top: 2%;
                }
               
            }
        }
    }
    main {
      width: 85%;
      margin: auto;
  }
   
  h2 {
      margin-bottom: 1.5rem;
      font-size: 22px;
      color: #333;
      text-align: center;
  }
  h3 {
      font-size: 20px;
  }
   
  p {
      color: #555;
      font-size: 14px;
  }
   
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
              <add-to-card></add-to-card>
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
