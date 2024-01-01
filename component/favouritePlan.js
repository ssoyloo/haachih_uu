import { FavouriteList } from '/fav-plan-rend.js';

export class FavouriteListComponent extends HTMLElement {
    constructor() {
        super();
        this.returnPlanValue = "";
        this.favPlanNum = 0;
        this.listPlanJSON = []; 
        this.render_count();
    }

    render_count() {
        if (!JSON.parse(localStorage.getItem('listsPlan'))) {
            this.favPlanNum = 0;
        }
        this.innerHTML = `
             <div class="count" id="count"><span>${this.favPlanNum}</span></div>
        `;
    }

    addToCart(myProductPlan) {
        const isDuplicate = this.listPlanJSON.some((existingProduct) => existingProduct.title === myProductPlan.title);
        if (!isDuplicate) {
            this.listPlanJSON.push(myProductPlan);
            localStorage.setItem("listsPlan", JSON.stringify(this.listPlanJSON));
            this.favPlanNum++;
            console.log(this.listPlanJSON);
            window.alert(`Successfully added "${myProductPlan.title}" in your favorites`);
            const count = document.querySelector("favourite-count");
            count.update();
        } else {
            window.alert(`You already added "${myProductPlan.title}" in your favorites`);
        }
        this.render_count();
    }

    jsonToCard() {
        const plansContainer = document.querySelector(".plans");
        plansContainer.innerHTML = '';
        if (JSON.parse(localStorage.getItem("listsPlan"))) {
            const listsPlan = JSON.parse(localStorage.getItem("listsPlan"));
            for (const data of listsPlan) {
                const product = new FavouriteList(data);
                this.returnPlanValue += product.render_plan_list();
            }
            document.querySelector(".plans").insertAdjacentHTML("beforeend", this.returnPlanValue);
        } else {
            if (plansContainer) {
                plansContainer.innerHTML = `<h2 class="baihgui">Зүрхэндээ төлөвлөгөө нэмээрэй</h2>`;
            }
        }
    }

    connectedCallback() {
        if (localStorage.getItem("listsPlan")) {
            this.listPlanJSON = JSON.parse(localStorage.getItem("listsPlan"));
            this.favPlanNum = this.listPlanJSON.length;
        } else {
            this.listPlanJSON = [];
        }
        this.render_count();
        this.jsonToCard();
    }

    get favPlanCount() {
        return this.favPlanNum;
    }
}

window.customElements.define("favourite-plan", FavouriteListComponent);
