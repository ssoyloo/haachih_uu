class searchPlace extends HTMLElement {
    constructor() {
      super();
    }
   
    connectedCallback() {
      this.parentNode.innerHTML = `
            <style>
            .option {
              border-radius: 1rem;
              height: 7rem;
              width: 70%;
              opacity: 90%;
              background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
              margin: 3rem auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              & p {
                padding: 0.6rem;
                text-align: center;
                color: var(--bg-dark-color);
                font-size: 1rem;
              }
            }
   
            .Lsearch {
              display: flex;
              text-align: center;
              overflow: hidden;
              border-radius: 1rem;
              width: 70%;
              & select, button {
                flex: 1;
                font-size: 0.9rem;
                padding: 0.5rem;
              }
              & select {
                font-family: pangolin;
                color: var(--p-color);
                background-color: var(--bg-light-color);;
              }
              & button {
                background-image: linear-gradient(to bottom left, var(--main-color), var(--secondary-color));
                color: var(--bg-light-color);
                border: none;
                border-radius: 0 1rem 1rem 0;
                font-family: pangolin;
              }
            }
   
            .Lsearch button:hover {
              color: var(--hover-color);
            }
   
            @media (max-width: 1100px) {
              .option{
                height: auto;
                width: 95%;
              }
   
              .Lsearch {
                flex-direction: column;
                margin-left: auto;
                margin-right: auto;
              }
   
              .Lsearch select,
              .Lsearch button {
                width: calc(100% - 0.6rem);
                margin: 0.3rem;
                border-radius: 1rem;
              }
   
              .Lsearch  select  {
                width: calc(100% - 0.6rem);
              }
            }
   
            @media (max-width: 1500px) {
              .Lsearch select,
              .Lsearch button {
                flex-basis: calc(33.333% - 0.6rem);
              }
            }
   
            @media (max-width: 768px) {
              .Lsearch select,
              .Lsearch button {
                width: auto;
                max-height:1.8rem;
                margin-top: 0.3rem;
                font-size: 0.65em;
              }
              .option p {
                font-size: 0.8rem;
            }
   
            }
            </style>
        <div class="option">
          <p>Орох газраа хайж болдог байгаа шүү</p>
        <div class="Lsearch">
          <select aria-label="huniiToo" id="huniiToo">
            <option value="">Хүний тоо</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
            <option value="20">20+</option>
            <option value="30">30+</option>
            <option value="40">40+</option>
            <option value="50">50+</option>
          </select>
          <select aria-label="oirhonGazar" id="oirhonGazar">
            <option value="">Ойрхон газар</option>
            <option value="HanUul">Хан-Уул дүүрэг</option>
            <option value="SonginoHairhan">Сонгино хайрхан дүүрэг</option>
            <option value="Baynzurh">Баянзүрх дүүрэг</option>
            <option value="Chingeltei">Чингэлтэй дүүрэг</option>
            <option value="Sukhbaatar">Сүхбаатар дүүрэг</option>
            <option value="Nalaih">Налайх дүүрэг</option>
            <option value="Bayngol">Баянгол дүүрэг</option>
          </select>
          <select aria-label="type" id="type">
            <option value="">Төрөл</option>
            <option value="HoolniiGazar">Хоолны газрууд</option>
            <option value="Cafe">Кафе</option>
            <option value="PubLounge">Паб, лоунж</option>
            <option value="Camp">Зуслан</option>
            <option value="Karaoke">Караоке</option>
            <option value="Museum">Музей</option>
            <option value="Cinema">Кино театр</option>
            <option value="Club">Клаб</option>
            <option value="Garden">Хүрээлэн</option>
            <option value="Enjoy">Хөгжилдөх газар</option>
          </select>
          <button type="button" onclick="getValueForFilter()">LET'S GO</button>
        </div>
      </div>
              `;
    }
   
    render() {
      let state = 1;
    }
  }
   
  customElements.define("search-place", searchPlace);