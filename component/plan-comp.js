console.log("wassup");

class Plan extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <article class='PlanInfo'>
        <img src="${this.getAttribute("image")}" alt="${this.getAttribute(
      "title"
    )}" />
    <add-to-card></add-to-card>
        <div id="contentSlot" class="title">
          <h3><slot name="title">${this.getAttribute("title")}</slot></h3>
          <meter value="${this.getAttribute(
            "stars"
          )}" min="0.0" max="5.0" id="meter">
            <i class="fa-solid fa-star"></i> <span>${this.getAttribute(
              "stars"
            )}</span>
          </meter>
        </div>
        <p><i class="fa-solid fa-tag"></i><slot name="tag">${this.getAttribute(
          "tag"
        )}</slot></p>
        <address id="location">
          <i class="fa-solid fa-location-dot"></i><slot name="location">${this.getAttribute(
            "location"
          )}</slot>
        </address>
        <a href="./plan.html?thisName=${this.title}&tag=${this.getAttribute(
      "tag"
    )}">
          <button class="value"><span>${this.getAttribute(
            "buttonText"
          )}</span>К-c эхэлье</button>
        </a>
      </article>
    `;
  }
}

// Define the custom element using the class
customElements.define("plan-comp", Plan);
