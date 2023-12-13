class FavouritePlaceList {
    constructor(places) {
        this.places = places; 
        
    }

    render_later_list() {
        return `
        <article class="placeResult">
            <figure class="PlaceImage">
                <img src="${this.places.image}" alt="sura">
                
            </figure>
            <figure class="PlaceInfo">
                <h4>${this.places.type}</h4>
                <h3>${this.places.title}</h3>
                <p class="tag"><i class="fa-solid fa-tag"></i> ${this.places.tag}</p>
                <address><i class="fa-solid fa-location-dot"></i>${this.places.location}</address>
                <a href="11326020"><i class="fa-solid fa-phone"></i> 11326020</a>
                <p><i class="fa-regular fa-clock"></i> <time datetime="2023-02-08">00:00</time>-<time>23:59</time></p>
                <h4 class="IntroName">Танилцуулга</h4>
                <p class="intro">Сура монголд албан ёсны эрхтэйгээр оруулж ирсэн гайхалтай амт бөгөөд таныг жаргалд умбуулна кс хаххаха</p>
                <button class="value"><span>100</span>K-c эхэлье</button>
            </figure>
        </article>
    `;
    }
}

class FavouritePlaceListComponent extends HTMLElement {
    constructor() {
        super();
        this.lists = [];
        this.returnValue = "";
        this.favNum = 0;
        this.listJSON = []; 
    }


    addToCart(myProduct) {
        // console.log(myProduct);
        // this.lists.push(myProduct);
        // const product = new FavouritePlaceList(myProduct);
        // this.listJSON.push(myProduct);
        // localStorage.setItem("lists", JSON.stringify(this.listJSON));
        // this.favNum++;
        // this.returnValue += product.render_later_list(); 
        const isDuplicate = this.listJSON.some((existingProduct) => existingProduct.title === myProduct.title);
        if (!isDuplicate) {
            this.lists.push(myProduct);
            this.listJSON.push(myProduct);
            localStorage.setItem("lists", JSON.stringify(this.listJSON));
            this.favNum++;
            window.alert("successfully added. Total item "+this.favNum);
        } else {
            window.alert(`You already added "${myProduct.title}" in your favourite.`);
        }
    }

    jsonToCard() {
        
        if (JSON.parse(localStorage.getItem("lists"))) {
            const lists = JSON.parse(localStorage.getItem("lists"));
            for (const data of lists) {
                const product = new FavouriteList(data);
                this.returnValue += product.render_later_list();
            }
            document.querySelector(".place").insertAdjacentHTML("beforeend", this.returnValue);
        }
    }
    connectedCallback() {
        if (localStorage.getItem("lists")) {
            this.listJSON = JSON.parse(localStorage.getItem("lists"));
            this.favNum = this.listJSON.length;
        } else {
            this.listJSON = [];
        }
        this.jsonToCard();
    }
    get productCount() {
        return this.favNum;
    }
}

window.customElements.define("favourite-place", FavouritePlaceListComponent);
// <meter value="3.5" min="0.0" max="5.0"><i class="fa-solid fa-star"></i><span>${this.places.stars}</span></meter>