import { FavouriteList } from '../jsmodule/fav-plan-rend.js';

class FavouriteListComponent extends HTMLElement {
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
        // const product = new FavouriteList(myProduct);
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
            console.log(this.lists)
            window.alert("successfully added. Total item "+this.favNum);
        } else {
            window.alert(`You alread added "${myProduct.title}" in your favourite.`);
        }
    }

    
    jsonToCard() {
        const plansContainer = document.querySelector(".plans");
        if (JSON.parse(localStorage.getItem("lists"))) {
            const lists = JSON.parse(localStorage.getItem("lists"));
            for (const data of lists) {
                const product = new FavouriteList(data);
                this.returnValue += product.render_later_list();
            }
            document.querySelector(".plans").insertAdjacentHTML("beforeend", this.returnValue);
            
        }else{
            if (plansContainer) {
                plansContainer.innerHTML = `<h2 class="baihgui">Here is no plans.</h2>`;
            }
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

window.customElements.define("favourite-plan", FavouriteListComponent);
