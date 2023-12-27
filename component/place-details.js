import "../jsmodule/place-details-rend.js";
 
class Place extends HTMLElement {
  constructor() {
    super();
 
    this.name = this.getAttribute("name");
    this.image = this.getAttribute("image");
    this.category = this.getAttribute("category");
    this.address = this.getAttribute("address");
    this.intro = this.getAttribute("intro");
    this.buttonText = this.getAttribute("buttonText");
    this.hours = this.getAttribute("hours");
    this.capacity = this.getAttribute("capacity");
    this.wifi = this.getAttribute("wifi");
    this.parking = this.getAttribute("parking");
    this.noice = this.getAttribute("noice");
    this.vip = this.getAttribute("vip");
    this.mic = this.getAttribute("mic");
    this.spkr = this.getAttribute("spkr");
 
    this.innerHTML = `
    <article class="subNewPlaces" >
                  <div class="image">
                    <img src="${this.getAttribute(
                      "image"
                    )}" alt="${this.getAttribute("name")}">
                    <add-place-card></add-place-card>
                  </div>
                  <div class="details">
                    <h3>${this.getAttribute("name")}</h3>
                    <p><i class="fa-solid fa-tag"></i> ${this.getAttribute(
                      "category"
                    )}</p>
                    <address><i class="fa-solid fa-location-dot"></i>${this.getAttribute(
                      "address"
                    )}</address>
                    <i class="far fa-clock"></i>
                    <time>${this.getAttribute("hours")}</time><br>
                      <button class="value">
                        <span>${this.getAttribute(
                          "buttonText"
                        )}</span>К -с эхэлнэ
                      </button>
                  </div>
                </article>
    `;
  }
  connectedCallback() {
    this.querySelector(".value").addEventListener("click", () => {
      sessionStorage.setItem("name", this.name);
      sessionStorage.setItem("image", this.image);
      sessionStorage.setItem("category", this.category);
      sessionStorage.setItem("address", this.address);
 
      sessionStorage.setItem("capacity", this.capacity);
      sessionStorage.setItem("intro", this.intro);
 
      sessionStorage.setItem("wifi", this.wifi);
      sessionStorage.setItem("parking", this.parking);
      sessionStorage.setItem("noice", this.noice);
      sessionStorage.setItem("vip", this.vip);
      sessionStorage.setItem("mic", this.mic);
      sessionStorage.setItem("spkr", this.spkr);
 
      window.location.href = "place.html";
    });
  }
}
 
// Define the custom element using the class
customElements.define("place-comp", Place);
