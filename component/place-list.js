class PlaceList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.places = [];
  }
 
  connectedCallback() {
    const topAttr = this.getAttribute("topPlace");
    this.fetchPlaces(topAttr);
  }
 
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selected-category" && oldValue !== newValue) {
      this.fetchPlaces();
    }
  }
 
  async fetchPlaces(topAttr) {
    try {
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/65925eb5266cfc3fde710003`
      );
 
      if (response.status === 429) {
        console.warn(
          "API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset."
        );
        return;
      }
 
      const data = await response.json();
      this.places = data.record || [];
      this.render(topAttr);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }
 
  render(topAttr) {
    const places = this.places.slice(0, topAttr) || [];
 
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
        <link rel="stylesheet" href="/general.css">
        <style>
        h2 {
          margin: 3rem;
            font-size: 1rem;
            color: var(--h-color);
            text-align: center;
        }
        .newPlaces {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 1rem;
          & .subNewPlaces {
              display: flex;
              background-color: var(--bg-light-color);
              border: 1px solid var(--deactive-star-color);
              max-width: 100%;
              border-radius: 1.4rem;
              max-height: 100%;
              & meter {
                position: absolute;
                margin-left:-5.5rem;
                margin-top: 0.5rem;
                color:var(--bg-light-color);
                & i {
                  color:var(--bg-light-color);
                }
              }
              & .image {
                  flex: 1;
                  max-width: 19rem;
              }
              & .addToCard {
                background: none;
                border-radius: 0.5rem;
                border: none;
                width: 1.8rem;
                height: 1.8rem;
                & i {
                  color: var(--bg-dark-color);
                }
              }
              & .addToCard:hover{
                background-color: var(--bg-light-color);
              }
              & .details {
                  flex: 1;
                  margin: 1rem;
                  & .miniTitle {
                    display:flex;
                    flex-direction: row;
                    justify-content: space-between;
                  }
                  & .value{
                    margin-top: 2%;
                    text-align: center;
                    margin-left: 24%;
                    border-radius: 0.5rem;
                }
              }
              & address, i, p, time{
                color:var(--p-color);
              }
          }
 
         
          .addToCard .fa-heart {
            font-size: 1.3rem;
          }
          & .subNewPlaces img{
              height: 100%;
              width: auto;
              border-radius: 1rem;
          }
        }
     
        /* Media Queries */
        @media (max-width: 1200px) {
          .newPlaces {
            grid-template-columns: repeat(2, 1fr); /* 2 columns layout */
          }
        }
       
        @media (max-width: 740px) {
          .newPlaces {
            grid-template-columns: 1fr; /* 1 column layout */
          }
        }
      </style>
        <section class='newPlaces'>
            ${places
              .map(
                (place) => `
                <place-comp
                  name="${place.name}"
                  image="${place.image}"
                  stars="${place.stars}"
                  category="${place.category}"
                  address="${place.address}"
                  intro = "${place.introduction}"
                  hours = "${place.hours}"
                  capacity = "${place.countPeople}"
                  wifi = "${place.freewifi}"
                  parking = "${place.parking}"
                  noice = "${place.noice}"
                  vip = "${place.VIProom}"
                  mic = "${place.microphone}"
                  spkr = "${place.speaker}"
                  buttonText = "${place.buttonText}"
                  > </place-comp>
            `
              )
              .join("")}
        </section>
      `;
  }
}
 
customElements.define("place-list", PlaceList);