class RecommendPlaceList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.places = [];
  }
 
  connectedCallback() {
    const topAttr = this.getAttribute("topPlace");
    const topCount = parseInt(topAttr);
    const isSort=this.getAttribute("isSort");
    this.fetchPlaces(topCount, isSort);
  }
 
  async fetchPlaces(topCount, isSort) {
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
      if(isSort=="yes"){
        this.SortPlace();
      }
      this.SlicePlaces(topCount);
      this.render();
 
      // console.log(this.places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }
 
  SortPlace(){
    this.places.sort((a, b) => b.stars - a.stars);
  }

  SlicePlaces(topCount) {
    this.places = this.places.slice(0, topCount);
  }
 
  render() {
    const places = this.places || [];
    let currentIndex = 0;
 
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      <link rel="stylesheet" href="/general.css">
      <style>
      h2 {
        margin: 3rem;
          font-size: 1.5rem;
          color: var(--p-color);
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
            & meter {
              position: absolute;
              margin-left:-5.5rem;
              margin-top: 0.5rem;
              color:var(--bg-light-color);
              & i {
                color:var(--bg-light-color);
              }
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
              background-color: var(--bg-dark-color);
            }
            & .details {
                // right:50%;
                position: absolute;
                margin-top: -11.6rem;
                border-radius: 1rem;
                background-color:var(--p-clor);
                width:15%;
                padding: 1rem 1rem;
                opacity:80%;
                & .miniTitle {
                  display:flex;
                  flex-direction: row;
                  justify-content: space-between;
                }
                & .value{
                  margin: 2%;
                  text-align: center;
                  border-radius: 0.3rem;
                  margin-left:2rem;
              }
            }
            & address, i, p, time {
              color:var(--p-color);
             
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
            border: 1px solid var(--deactive-star-color);
            display: flex;
            max-width: 100%;
            border-radius: 20px;
            max-height: 13rem;
            & meter {
              position: absolute;
              margin-left:-5.5rem;
              margin-top: 0.5rem;
              color:#fff;
              & i {
                color:var(--bg-light-color);
              }
            }
            & .image {
                flex: 1;
                max-width: 40%;
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
              background-color: var(--p-color);
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
                  margin-top: 2rem;
                  text-align: center;
                  border-radius: 0.5rem;
                  transform: translateX(60%);
              }
            }
            & address, i, p, time{
              color:var(--p-color);
            }
        }
      }
      .addToCard .fa-heart {
        font-size: 1.3rem;
      }

     
      @media (max-width: 1480px) {
        .subRecommend .subNewPlaces{
          max-height: 12.5rem;
        }
      }

      @media (max-width: 1400px) {
        .subRecommend .subNewPlaces{
          max-height: 11.8rem;
        }
        .subRecommend .subNewPlaces .details .value {
          margin-top: 1rem;
        }
      }

      @media (max-width: 1328px) {
        .details {
            width:17%;
            height: 11.3rem;
        }
      }

      @media (max-width: 1280px) {
        .subRecommend .subNewPlaces{
          max-height: 10.8rem;
        }
        .subRecommend .subNewPlaces .details{
          font-size:0.9rem;
        }
        .subRecommend .subNewPlaces .details .value {
          margin-top:0.7rem;
          font-size:0.9rem;
        }
      }
      @media (max-width: 1200px) {
        .placesToRecommend .BigRecommend .details{
          width:20%;
        }
        .subRecommend .subNewPlaces{
          max-height: 10rem;
        }
        .subRecommend .subNewPlaces .miniTitle{
          font-size:1.2rem;
        }
        .subRecommend .subNewPlaces .details{
          margin-top:0.5rem;
        }
        .subRecommend .subNewPlaces .details .value {
          margin-top:0.7rem;
          font-size:0.9rem;
        }
      }
      @media (max-width: 1140px) {
        .subRecommend .subNewPlaces{
          max-height: 9.5rem;
        }
        .subRecommend .subNewPlaces .details{
          margin:0.2rem;
        }
        .subRecommend .subNewPlaces .miniTitle h3{
          font-size: 1.4rem;
        }
      }
      @media (max-width: 1070px) {
        .subRecommend .subNewPlaces{
          max-height: 8.9rem;
        }
        .subRecommend .subNewPlaces .details{
          margin:0.2rem;
        }
        .subRecommend .subNewPlaces .miniTitle h3, .subRecommend .subNewPlaces .miniTitle .fa-heart{
          font-size: 1.2rem;
        }
        .subRecommend .subNewPlaces .details .value{
          font-size: 0.8rem;
          margin-top: 0;
        }
      }
      @media (max-width: 970px) {
        .placesToRecommend {
          grid-template-columns: 1fr;
          gap: 0;          
        }
     
        .BigRecommend{
          max-width: 100%;
          margin: auto;
        }
        .placesToRecommend .BigRecommend .details .value{
          margin-left:0;
          width:100%;
        }
        .subRecommend {
          max-width: 100%;
          margin: auto;
        }
        .subRecommend .subNewPlaces{
          max-width:35rem;
          display:flex;
          justify-content:center;
          max-height: 13rem;
          margin:auto;
          margin-top: 1.5rem;
        }
        .subRecommend .subNewPlaces .details{
          margin:1rem 1rem 0 1rem;
          font-size:1rem;
        }
        .subRecommend .subNewPlaces .details .value {
          font-size:1rem;
        }
        .subRecommend .subNewPlaces .miniTitle h3{
          font-size: 1.5rem;
        }
        .subRecommend .subNewPlaces .miniTitle .fa-heart{
          font-size: 1.3rem;
        }
        .BigRecommend .value {
          font-size: 0.9rem;
        }
      }
     
      @media (max-width: 768px) {
        .placesToRecommend .BigRecommend h3, .placesToRecommend .subNewPlaces h3 {
          font-size: 1.3rem;
        }
        .BigRecommend .miniTitle .fa-heart{
          font-size: 1.1rem;
        }
        .placesToRecommend .BigRecommend .details{
          width:25%;
        }
      }

      @media (max-width: 543px) {
        .placesToRecommend .BigRecommend .details{
          width:30%;
        }
        .subRecommend .subNewPlaces .details .value {
          font-size:1rem;
          margin-left:-1.5rem;
        }
      }
      @media (max-width: 440px) {
        .placesToRecommend .BigRecommend .details .miniTitle h3{
          font-size:1.1rem;
        }
        .placesToRecommend .BigRecommend .details .miniTitle .fa-heart{
          font-size:1rem;
          margin-right:-1rem;
        }
        .placesToRecommend .BigRecommend .details {
          font-size:0.8rem;
          max-height:10rem;
          margin-top:-10.3rem;
          border-radius:0.4rem;
        }
        .placesToRecommend .BigRecommend .details .value {
          font-size:0.8rem;
        }
        .subRecommend .subNewPlaces .details .value {
          font-size:0.9rem;
          margin-left:-2rem;
        }
        .subRecommend .subNewPlaces .details {
          font-size:0.9rem;
        }
        .subRecommend .subNewPlaces .image meter {
          width:3.5rem;
          font-size:0.8rem;
          margin-left:-4rem;
          border-radius:0.4rem;
        }
        .subRecommend .subNewPlaces .image meter .fa-star {
          font-size:0.7rem;
        }
        .subRecommend .subNewPlaces {
          max-height: 10rem;
        }
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
    </style>
        <h2>Санал болгочихъё</h2>
        <section class='placesToRecommend'>
          <article class="BigRecommend">
            ${
              places[0]
                ? `
                <div class="image">
                  <img src="/sura.jpg" alt="${places[0].name}">
                  <meter value="image="${places[0].stars}" min="0.0" max="5.0" id="meter">
                    <i class="fa-solid fa-star"></i> <span>${places[0].stars}</span>
                  </meter>
                </div>
                <div class="details">
                  <div class="miniTitle">
                    <h3>${places[0].name}</h3>
                    <add-place-card></add-place-card>
                  </div>
                  <p><i class="fa-solid fa-tag"></i>${places[0].category}</p>
                  <address><i class="fa-solid fa-location-dot"></i>${places[0].address}</address>
                  <i class="far fa-clock"></i>
                  <time>${places[0].hours}</time><br>
                  <a href="./place.html">
                    <button class="value">
                      <span>${places[0].buttonText}</span>К -с эхэлнэ
                    </button>
                  </a>
                </div>`
                : ""
            }
          </article>
          <section class="subRecommend">
          ${places
            .map((place, index) => {
              if (index === 0) {
                return '';
              }
              return `
                <place-comp
                  name="${place.name}"
                  image="${place.image}"
                  stars="${place.stars}"
                  category="${place.category}"
                  address="${place.address}"
                  intro="${place.introduction}"
                  hours="${place.hours}"
                  capacity="${place.countPeople}"
                  wifi="${place.freewifi}"
                  parking="${place.parking}"
                  noice="${place.noice}"
                  vip="${place.VIProom}"
                  mic="${place.microphone}"
                  spkr="${place.speaker}"
                  buttonText="${place.buttonText}"
                  isSort="yes" topplace="4">
                </place-comp>
              `;
            })
            .join('')}
        </section>
        
      `;
  }
}
 
customElements.define("rec-place-list", RecommendPlaceList);