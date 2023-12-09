class FavouriteList {
    constructor(plans) {
        this.plans = plans; 
        
    }

    render_later_list() {
        return `
        <article class="item">
    <div class="PlanImage">
        <img src="${this.plans.image}" alt="${this.plans.title}">
        <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i> <span>${this.plans.stars}</span></meter>
    </div>
    <div class="PlanInfo">
        
        <h3>${this.plans.title}</h3>
        <p>
            <i class="fa-solid fa-tag"></i>
            ${this.plans.tag}
        </p>
        
        <address>
            <i class="fa-solid fa-location-dot"></i>
            ${this.plans.location}
        </address>

        
        <p>
            <i class="fa-regular fa-clock"></i>
            <time datetime="2023-02-08">7:30</time>-<time>21:00</time></p>

        
        <a href="./plan.html?planName=${this.plans.title}&tag=${this.plans.tag}"" ><button class="value"><span>${this.plans.buttonText}</span></button></a>
        
    </div>
    </article>
    `;
    }
}

class FavouriteListComponent extends HTMLElement {
    constructor() {
        super();
        this.lists = [];
        this.className = "watch";
        this.returnValue = "";
        this.watchNum = 0;
        this.listJSON = []; 
    }


    addToCart(myProduct) {
        // console.log(myProduct);
        // this.lists.push(myProduct);
        // const product = new FavouriteList(myProduct);
        // this.listJSON.push(myProduct);
        // localStorage.setItem("lists", JSON.stringify(this.listJSON));
        // this.watchNum++;
        // this.returnValue += product.render_later_list(); 
        const isDuplicate = this.listJSON.some((existingProduct) => existingProduct.title === myProduct.title);
        if (!isDuplicate) {
            this.lists.push(myProduct);
            const product = new FavouriteList(myProduct);
            this.listJSON.push(myProduct);
            localStorage.setItem("lists", JSON.stringify(this.listJSON));
            this.watchNum++;
            this.returnValue += product.render_later_list();
            window.alert("successfully added");
        } else {
            window.alert(`You alread added "${myProduct.title}" in your favourite.`);
        }
    }

    
    jsonToCard() {
        if (JSON.parse(localStorage.getItem("lists"))) {
            const lists = JSON.parse(localStorage.getItem("lists"));
            for (const data of lists) {
                const product = new FavouriteList(data);
                this.returnValue += product.render_later_list();
            }
            if (document.querySelector(".plans")) {
                document    
                    .querySelector(".plans")
                    .insertAdjacentHTML("beforeend", this.returnValue);
            }
        } else {
            if (document.querySelector(".plans")) {
                document.querySelector(
                    ".plans"
                ).innerHTML = `<style>
                .checkout-button{display:none;} 
                button {
                    border: none;
                    border-radius: var(--border-radius);
                    background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
                    color: white;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    padding: 0.7em 0.7em;
                    font-size: 1em;
                }
                </style>
                <h2 class="baihgui">Here is no plans.</h2>`;
            }
        }
    }
    connectedCallback() {
        if (localStorage.getItem("lists")) {
            this.listJSON = JSON.parse(localStorage.getItem("lists"));
            this.watchNum = this.listJSON.length;
        } else {
            this.listJSON = [];
        }
        this.jsonToCard();
    }
    disconnectedCallback() { }

    get productCount() {
        return this.watchNum;
    }
}

window.customElements.define("later-comp", FavouriteListComponent);
