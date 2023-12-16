import { FavouritePlaceList  } from "../jsmodule/fav-place-rend.js";

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