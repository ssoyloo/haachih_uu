class PlanList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.plans = [];
    this._selectedTag = null;
    this._selectedName = null;
    this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    this._selectedTag = urlParams.get("tag");
    this._selectedName = urlParams.get("planName");

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addListener(() => {
      this.darkMode = darkModeMediaQuery.matches;
      this.render();
    });

    this.fetchPlans();
  }
  // toggleDarkMode() {
  //   this.darkMode = !this.darkMode;
  //   this.render();
  // }
  static get observedAttributes() {
    return ["selected-tag"];
  }
  static get observedAttributes() {
    return ["selected-planName"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selected-tag" && oldValue !== newValue) {
      this._selectedTag = newValue;
      this.fetchPlans();
    }
    if (name === "selected-planName" && oldValue !== newValue) {
      this._selectedName = newValue;
      this.fetchPlans();
    }
  }

  async fetchPlans() {
    try {
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/658bccaadc74654018895226`
      );

      if (response.status === 429) {
        console.warn(
          "API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset."
        );
        return;
      }

      const data = await response.json();
      this.plans = data.record || [];
      this.sortPlansByStars();
      this.filterPlansByName();
      this.filterByTagName();
      if (this.plans.length == 0) {
        console.log("zero");
        const notify = document.querySelector(".sayNothing");
        console.log(notify);
        notify.innerHTML = "<h2>Here are no similar plans.</h2>";
      }
      this.render();
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }
  sortPlansByStars() {
    this.plans.sort((a, b) => b.stars - a.stars);
    this.plans = this.plans.slice(0, 4);
  }
  filterPlansByName() {
    if (this._selectedName) {
      this.plans = this.plans.filter((plan) =>
        this._selectedName
          ? plan.title.toLowerCase() !== this._selectedName.toLowerCase()
          : true
      );
    }
  }
  filterByTagName() {
    if (this._selectedTag) {
      this.plans = this.plans.filter((plan) =>
        this._selectedTag
          ? plan.tag.toLowerCase() == this._selectedTag.toLowerCase()
          : true
      );
    }
  }

  render() {
    const plans = this.plans || [];
    const themeClass = this.darkMode ? "dark-theme" : "light-theme";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      <link rel="stylesheet" href="../css/general.css">
      <style>
        h2 {
          margin: 3rem;
          font-size: 24px;
          color: #333;
          text-align: center;
        }

        article {
          & img {
            max-width: 100%;
            border-radius: 1rem;
            margin-bottom: 2%;
            position: relative;
           }
          & h3 {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
          }
        }
   
        p {
          color: #555;
          font-size: 14px;
        }

        button:hover {
            background-color: #0056b3;
        }

        .plan-container{
          background-color: ${this.darkMode ? "var(--bg-dark-color)" : "#fff"};
          & .item {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              flex-wrap: wrap;
              & .PlanInfo {
                  border: 1px solid #ccc;
                  background-color: #fff;
                  max-width: 290px;
                  width: 100%;
                  margin: 0 10px 20px; 
                  border-radius: 1rem;
                  background-color: ${this.darkMode ? "#555" : "#fff"};
                      color: ${this.darkMode ? "#fff" : "#333"};
              & .title {
                  display: flex;
                  justify-content: space-between;
                  padding: 0.8rem;
                  & meter {
                      margin-top: -0.3rem;
                      height: 100%;
                  }
                  & img {
                    position: relative;
                  }
              }
              & address {
                  color: #555;
                  font-size: 14px;
                  margin-left: 1.5rem;
              }
              & p {
                  margin-left: 1.5rem;
                  margin-bottom: 0.5rem;
              }
              & .PlanInfo:hover{
                  background-color: #d0dce9;
                  transition: 0.4s;
              }
              & .value{
                  transform: translateX(55%);
                  border-radius: 0.5rem;
                  margin: 0.8rem ;
                  right: 50%;
              }
          }
      }

      .addToCard {
        position: absolute;
        background: none;
        border: none;
        color: #000;
        width: 1.8rem;
        height: 1.8rem;
        background-color: #e7e7e7;
        border-radius: 0.5rem;
        margin-left: -2.3rem;
        margin-top: 0.5rem;
      }
      .addToCard .fa-heart {
        font-size: 1.3rem; 
      }
      .addToCard:hover{
        background-color: #797777;
      }  
      </style>
      <section class='plan-container'>
        
      <div class="item">
        ${plans
          .map(
            (plan) => `
            <plan-comp
            title="${plan.title}"
            image="${plan.image}"
            stars="${plan.stars}"
            tag = "${plan.tag}"
            location = "${plan.location}"
            buttonText = "${plan.buttonText}"> </plan-comp>
        `
          )
          .join("")}
      </div>
    </section>
    `;
  }
}

customElements.define("plan-list", PlanList);
