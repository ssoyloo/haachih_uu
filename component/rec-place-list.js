class RecommendPlaceList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.places = [];
  }

  connectedCallback() {
    this.fetchPlaces();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selected-category" && oldValue !== newValue) {
      this.fetchPlaces();
    }
  }

  async fetchPlaces() {
    try {
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/65642e6812a5d376599f7004`
      );

      if (response.status === 429) {
        console.warn(
          "API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset."
        );
        return;
      }

      const data = await response.json();
      this.places = data.record || [];
      this.SortslicePlace();
      this.render();
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  SortslicePlace() {
    this.places.sort((a, b) => b.stars - a.stars);
    this.places = this.places.slice(0, 4);
  }

  render() {
    const places = this.places || [];
    let currentIndex = 0;

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

      h2 {
        margin: 3rem;
          font-size: 24px;
          color: #333;
          text-align: center;
      }
      
      .placesToRecommend {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        & .BigRecommend {
            text-align: center;
            border: 1px solid #ccc;
            background-color: #fff;
            max-width: 60%;
            width: 100%;
            max-height: 10%;
            height: 100%;
            border-radius: 50px;
            margin-right: 20px;
         
            & img{
                height: 100%;
                width: 100%;
                border-radius: 5%;
            }
            & button{
                margin-bottom: 2%;
            }
            & .image{
              position: relative;
            }
            & .details {
                position: absolute;
                margin-top: -13rem;
            }
        }
         & .subRecommend{
            max-width: 500px;
            width: 100%;
            border-radius: 50px;
            overflow: hidden;
        }
        & button{
            margin-top: 2%;
        }
    
        & .RecommendPlacesToFlex img{
            height: 100%;
            width: auto;
            max-height: 13rem;
            border-radius: 1rem;
        }
        & .RecommendPlacesToFlex {
            margin-top: 30px;
            display: flex;
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
                  border-radius: 0.5rem;
              }
            }
        }
    }

        </style>
        <h2>Санал болгочихъё</h2>
  <section class='placesToRecommend'>
    ${places
      .map((place) => {
        const isBigRecommend = currentIndex === 0;
        currentIndex++;

        if (isBigRecommend) {
          return `
            <article class="BigRecommend">
              <div class="image">
                <img src="${place.image}" alt="${place.name}">
              </div>
              <div class="details">
                <h3>${place.name}</h3>
                <button @click="${() =>
                  this.handleAddToCart(place)}">Add to Cart</button>
                <p>${place.category}</p>
                <address>${place.address}</address>
                <i class="far fa-clock"></i>
                <time>${place.hours}</time><br>
                <a href="./place.html">
                  <button class="value">
                    <span>${place.buttonText}</span>К -с эхэлнэ
                  </button>
                </a>
              </div>
            </article>
          `;
        } else {
          return `
          <div class="subRecommend">
            <article class="RecommendPlacesToFlex">
              <div class="image">
                <img src="${place.image}" alt="${place.name}">
              </div>
              <div class="details">
                <h3>${place.name}</h3>
                <button @click="${() =>
                  this.handleAddToCart(place)}">Add to Cart</button>
                <p>${place.category}</p>
                <address>${place.address}</address>
                <i class="far fa-clock"></i>
                <time>${place.hours}</time><br>
                <a href="./place.html">
                  <button class="value">
                    <span>${place.buttonText}</span>К -с эхэлнэ
                  </button>
                </a>
              </div>
            </article>
            </div>
          `;
        }
      })
      .join("")}
  </section>
`;
  }

  handleAddToCart(place) {
    this.dispatchEvent(new CustomEvent("add-to-cart", { detail: { place } }));
  }
}

customElements.define("rec-place-list", RecommendPlaceList);
