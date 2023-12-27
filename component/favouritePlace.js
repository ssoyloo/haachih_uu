import {FavouritePlaceList} from '../jsmodule/fav-place-rend.js'
class FavouritePlaceListComponent extends HTMLElement {
    constructor() {
        super();
        this.lists = [];
        this.returnValue = "";
        this.favPlaceNum = 0;
        this.listJSON = []; 
        this.totalElm=0;
        this.render_count();
    }
    render_count() {
        // this.totalElm=productPlanCount();
        // console.log(this.totalElm);
        if(!JSON.parse(localStorage.getItem('lists'))){
                this.favPlaceNum = 0;
        }
        this.innerHTML = `
                <div class="countPlace" id="count"><span>${this.favPlaceNum}</span></div>
        `;
    }


    addToCart(myProduct) {
        // console.log(myProduct);
        // this.lists.push(myProduct);
        // const myProduct = new FavouritePlaceList(myProduct);
        // this.listJSON.push(myProduct);
        // localStorage.setItem("lists", JSON.stringify(this.listJSON));
        // this.favPlaceNum++;
        // this.returnValue += product.render_later_list(); 
        const isDuplicate = this.listJSON.some((existingProduct) => existingProduct.title === myProduct.title);
        if (!isDuplicate) {
            this.lists.push(myProduct);
            this.listJSON.push(myProduct);
            localStorage.setItem("lists", JSON.stringify(this.listJSON));
            this.favPlaceNum++;
            window.alert("successfully, You addes "+this.favPlaceNum+" place ");
        } else {
            window.alert(`You already added "${myProduct.title}" in your favourite.`);
        }
        this.render_count();
    }

    jsonToCard() {
        const placesContainer = document.querySelector(".places");
        
        // Clear the existing content before inserting new items
        placesContainer.innerHTML = '';
    
        if (JSON.parse(localStorage.getItem("lists"))) {
            for (const data of JSON.parse(localStorage.getItem("lists"))) {
                const product = new FavouritePlaceList(data);
                placesContainer.insertAdjacentHTML("beforeend", product.render_place_list());
            }
        } else {
            if (placesContainer) {
                placesContainer.innerHTML = `<h2 class="baihgui">Here is nothing.</h2>`;
            }
        }
    }
    connectedCallback() {
        if (localStorage.getItem("lists")) {
            this.listJSON = JSON.parse(localStorage.getItem("lists"));
            this.favPlaceNum = this.listJSON.length;
        } else {
            this.listJSON = [];
        }
        this.render_count();
        this.jsonToCard();
    }
    get productCount() {
        return this.favPlaceNum;
    }
}

window.customElements.define("favourite-place", FavouritePlaceListComponent);
// <meter value="3.5" min="0.0" max="5.0"><i class="fa-solid fa-star"></i><span>${this.places.stars}</span></meter>