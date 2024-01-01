export class FavouritePlaceList {
    constructor(places) {
        this.places = places; 
        
    }

    render_place_list() {
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
                <p><i class="fa-regular fa-clock"></i> <time datetime="2023-02-08">00:00</time>-<time>23:59</time></p>
                <h4 class="IntroName">Танилцуулга</h4>
                <p class="intro">Сура монголд албан ёсны эрхтэйгээр оруулж ирсэн гайхалтай амт бөгөөд таныг жаргалд умбуулна кс хаххаха</p>
                <button class="value"><span>100</span>K-c эхэлье</button>
            </figure>
        </article>
    `;
    }
}