class stars {
    constructor(data) {
        this.title = data.title;
        this.stars = data.stars;
    }

    render() {
        const star = document.getElementsByTagName("meter")[0];
        const formattedStars = this.stars.toFixed(1);
        star.innerHTML = `
            <i class="fa-solid fa-star"></i> <span>${formattedStars}</span>
        `;
        star.value = formattedStars;
    }
}

class starRender {
    constructor(apiUrl, targetselector) {
        this.apiUrl = apiUrl;
        this.targetselector = targetselector;
    }

    async fetchAndRender() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();

            const targetElement = document.querySelector(this.targetselector);

            data.forEach(starData => {
                const star = new stars(starData);
                star.render();
                targetElement.appendChild(star);
            });
        } catch (error) {
            console.error("Error fetching or parsing data:", error.message);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planName = urlParams.get("planName");
    if (planName) {
        const apiUrl = `http://localhost:3000/stars/${encodeURIComponent(planName)}`;
        const starRen = new starRender(apiUrl, ".ratingTitle");
        starRen.fetchAndRender();
    } else {
        console.error("planName parameter is missing in the URL.");
    }
});
