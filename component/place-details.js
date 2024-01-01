import "/place-details.js";
 
const template = document.createElement("template");
 
template.innerHTML = `  
  <i class="fa-solid fa-location-dot"></i>
  <slot></slot>
`;
 
class Place extends HTMLElement {
  constructor() {
    super();
    this.name = this.getAttribute("name");
    this.image = this.getAttribute("image");
    this.stars = this.getAttribute("stars");
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
        <img src="${this.getAttribute("image")}" alt="${this.getAttribute(
      "name"
    )}">
    <meter value="${this.getAttribute("stars")}" min="0.0" max="5.0" id="meter">
      <i class="fa-solid fa-star"></i> <span>${this.getAttribute(
        "stars"
      )}</span>
    </meter>
      </div>
      <div class="details">
        <div class="miniTitle">
          <h3>${this.getAttribute("name")}</h3>
          <add-place-card></add-place-card>
        </div>
        <p><i class="fa-solid fa-tag"></i> ${this.getAttribute("category")}</p>
        <address></address>
        <i class="far fa-clock"></i>
        <time>${this.getAttribute("hours")}</time><br>
        <button class="value">
          <span>${this.getAttribute("buttonText")}</span>К-с эхэлнэ
        </button>
      </div>
    </article>
    `;
  }
 
  connectedCallback() {
    const addressElement = this.querySelector(".details address");
    const templateContent = template.content.cloneNode(true);
    addressElement.appendChild(templateContent);
 
    addressElement.querySelector("slot").textContent =
      this.getAttribute("address");
 
    this.querySelector(".value").addEventListener("click", () => {
      sessionStorage.setItem("name", this.name);
      sessionStorage.setItem("image", this.image);
      sessionStorage.setItem("stars", this.stars);
      sessionStorage.setItem("category", this.category);
      sessionStorage.setItem("address", this.address);
      sessionStorage.setItem("phone", this.phone);
      sessionStorage.setItem("hours", this.hours);
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
 
export default Place;