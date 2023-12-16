export class FavouriteList {
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
        <h4>${this.plans.type}</h4>
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