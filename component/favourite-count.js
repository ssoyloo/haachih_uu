class FavouriteCount extends HTMLElement {
    constructor() {
        super();
        this.sum = 0;
        this.update();

    }

    connectedCallback() {
       this.update();
    }

    update() {
        this.calculate(); 
        this.render();
    }
    calculate(){
        const FavouritePlace = document.querySelector('favourite-place');
        const FavouritePlan = document.querySelector('favourite-plan');

        let numberValue = 0;
        let numberValue2 = 0;

        if (FavouritePlace) {
            const favPlaceComponent = FavouritePlace.favPlaceCount;//FavPlan.js n property duudaj bn
            if (favPlaceComponent) {
                numberValue = favPlaceComponent;
            }
        }
        if (FavouritePlan) {
            const favPlanComponent = FavouritePlan.favPlanCount;//FavPlace.js n property duudaj bn
            if (favPlanComponent) {
                numberValue2 = favPlanComponent;
            }
        }

        this.sum = numberValue + numberValue2;
    }

    render() {

        this.innerHTML = `
            <div class="count" id="count"><span>${this.sum}</span></div>
        `;
    }
}

window.customElements.define('favourite-count', FavouriteCount);
