
class RecommendPlaceList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.places = [];
  }

  connectedCallback() {
    const topAttr = this.getAttribute('topPlace');
    const topCount = parseInt(topAttr);
    console.log(topCount);
    this.fetchPlaces(topCount);
}

async fetchPlaces(topCount) {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/658bcbe8dc746540188951e3`);
        if (response.status === 429) {
            console.warn('API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset.');
            return;
        }
        const data = await response.json();
        this.places = data.record || [];
        this.sortAndSlicePlaces(topCount);
        this.render();
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

  sortAndSlicePlaces(topCount) {
      this.places.sort((a, b) => b.stars - a.stars);
      this.places = this.places.slice(0, topCount);
  }

  render() {
    const places = this.places || [];
    let currentIndex = 0;

    this.shadowRoot.innerHTML = `
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
                & .BigRecommend {
                    border: none;
                    & img{
                        height: 100%;
                        width: 100%;
                        border-radius: 2.5%;
                        position: relative;
                        max-height: 41rem;
                        max-width: 41rem;
                    }
                    & .addToCard {
                      position: absolute;
                      background: none;
                      border: none;
                      width: 1.8rem;
                      height: 1.8rem;
                      background-color: #e7e7e7;
                      border-radius: 0.5rem;
                      margin-left: -3rem;
                      margin-top: 1.3rem;
                      & i {
                        color: #000;
                      }
                    }
                    & .addToCard:hover{
                      background-color: #797777;
                    }
                    & .details {
                        position: absolute;
                        margin-top: -11.6rem;
                        border-radius: 1rem;
                        background-color:#e7e7e7;
                        width:15%;
                        padding: 1rem 1rem;
                        opacity:80%;
                        & .value{
                          margin: 2%;
                          text-align: center;
                          border-radius: 0.3rem;
                          margin-left:2rem;
                      }
                    }
                    & address, i, p, time {
                      color:#555;
                     
                    }
                }
       
                & .subRecommend{
                    max-width: 93%;
                    width: 100%;
                    border-radius: 1rem;
                    overflow: hidden;
                }
       
                & .subNewPlaces img{
                    height: 100%;
                    width: auto;
                    border-radius: 1rem;
                }
                & .subNewPlaces {
                  border: 1px solid #ddd;
                    display: flex;
                    max-width: 100%;
                    border-radius: 20px;
                    max-height: 13rem;
                    & .image {
                        flex: 1;
                        max-width: 40%;
                    }
                    & .addToCard {
                      position: absolute;
                      background: none;
                      border: none;
                      width: 1.8rem;
                      height: 1.8rem;
                      background-color: #e7e7e7;
                      border-radius: 0.5rem;
                      margin-left: -2.5rem;
                      margin-top: 0.8rem;
                      & i {
                        color: #000;
                      }
                    }
                    & .addToCard:hover{
                      background-color: #797777;
                    }
                    & .details {
                        flex: 1;
                        margin: 1rem;
                        & .value{
                          margin-top: 2rem;
                          text-align: center;
                          border-radius: 0.5rem;
                          transform: translateX(60%);
                      }
                    }
                    & address, i, p, time{
                      color:#555;
                    }
                }
              }
             
              .addToCard .fa-heart {
                font-size: 1.3rem;
              }
       
              //mediaquery endees ehelnee
              @media (max-width: 1400px) {
                .subNewPlaces img {
                  height: 100%;
                  width: auto;
                }
                .subNewPlaces .addToCard {
                  width: 1.8rem;
                  height: 1.8rem;
                 
                  // margin-top: -3rem;
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
                  max-height: auto; /* Allow the height to adjust to the content */
                }
                .subNewPlaces .image {
                  max-width: 100%; /* Adjust image width */
                }
                .subNewPlaces .details .value {
                  margin-top: 1rem; /* Adjust the button margin */
                }
              }
             
       
              @media (max-width: 1200px) {
                .placesToRecommend {
                  grid-template-columns: 1fr; /* Stack items vertically */
                }
             
                .BigRecommend, .subNewPlaces {
                  max-width: 100%;
                  margin: auto;
                  margin-top: 1.5rem;
                }
                .subNewPlaces  {
                  width: 80%;
                }
             
                .BigRecommend .image, .subNewPlaces .image {
                  max-width: 100%; /* Full width for images */
                  height: auto; /* Auto height for scaling */
                }
             
                .BigRecommend .details, .subNewPlaces .details {
                  width: 100%; /* Adjust width to full */
                  position: relative; /* Adjust position */
                  margin-top: 1rem; /* Add space above details */
                }
             
                .BigRecommend .value, .subNewPlaces .value {
                  padding: 0.5rem 1rem; /* Adjust padding */
                  width: auto; /* Adjust width */
                }
                .BigRecommend .value {
                  font-size: 0.9rem; /* Slightly smaller font size */
                }
              }
             
              @media (max-width: 768px) {
                /* Adjust font sizes and paddings for smaller devices like tablets and phones */
                h2, .BigRecommend h3, .subNewPlaces h3 {
                  font-size: 1.5rem; /* Smaller heading size */
                }
             
                .BigRecommend p, .subNewPlaces p,
                .BigRecommend address, .subNewPlaces address,
                .BigRecommend time, .subNewPlaces time {
                  font-size: 0.9rem; /* Smaller text size */
                }
             
                .BigRecommend .value, .subNewPlaces .value {
                  font-size: 0.9rem; /* Smaller button text size */
                  padding: 0.5rem; /* Smaller button padding */
                }
                .BigRecommend .value {
                  font-size: 0.8rem; /* Even smaller font size */
                }
              }
             
      </style>
      <h2>Санал болгочихъё</h2>
      <section class='placesToRecommend'>
        <article class="BigRecommend">
          ${places[0]
            ? `
            
              <div class="image">
                <img src="${places[0].image}" alt="${places[0].name}">
              </div>
              <div class="details">
              
                <h3>${places[0].name}</h3>
                <add-place-card></add-place-card>
                <p>${places[0].category}</p>
                <address>${places[0].address}</address>
                <i class="far fa-clock"></i>
                <time>${places[0].hours}</time><br>
                <a href="./place.html">
                  <button class="value">
                    <span>${places[0].buttonText}</span>К -с эхэлнэ
                  </button>
                </a>
              </div>`
            : ''}
        </article>
          ${places
            .map((place) => {
              return `
                <place-list topplace="3" style="gridhiineshuu"><place-list>`;
            })
            .join("")}
      </section>
    `;
  }

}

customElements.define('rec-place-list', RecommendPlaceList);
