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
    <link rel="stylesheet" href="../css/general.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
    <style>
 
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
