import { FavouritePlaceList } from '/fav-place-rend.js';

class FavouritePlaceListComponent extends HTMLElement {
    constructor() {
        super();
        this.listJSON = [];
        this.favPlaceNum = 0;
        this.render_count();
    }

    render_count() {
        if (!JSON.parse(localStorage.getItem('lists'))) {
            this.favPlaceNum = 0;
        }
        this.innerHTML = `
                <div class="countPlace" id="count"><span>${this.favPlaceNum}</span></div>
        `;
    }

    addToCart(myProduct) {
        const isDuplicate = this.listJSON.some((existingProduct) => existingProduct.title === myProduct.title);
        if (!isDuplicate) {
            this.listJSON.push(myProduct);
            localStorage.setItem("lists", JSON.stringify(this.listJSON));
            this.favPlaceNum++;
            window.alert("Successfully added " + this.favPlaceNum + " place in your favorites");
            const count = document.querySelector("favourite-count");
            count.update();
        } else {
            window.alert(`You already added "${myProduct.title}" in your favorites.`);
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
                placesContainer.innerHTML = `<h2 class="baihgui">Зүрхэндээ газар нэмээрэй</h2>`;
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

    get favPlaceCount() {
        return this.favPlaceNum;
    }
}

window.customElements.define("favourite-place", FavouritePlaceListComponent);

export { FavouritePlaceListComponent };
