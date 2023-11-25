const productURL = "https://api.jsonbin.io/v3/b/6543a6a454105e766fca6fa1";

let itemsInCategory; // Declare itemsInCategory outside the fetch block

fetch(productURL)
  .then((response) => response.json())
  .then((data) => {
    const categories = [...new Set(data.record.map((item) => item.category))];
    let i = 0;

    // Assign the itemsInCategory here
    itemsInCategory = data.record;

    const plansContainer = document.querySelector('.plans'); // Use querySelector instead of getElementsByClassName

    plansContainer.innerHTML = categories.map((category) => {
      const itemsInCurrentCategory = itemsInCategory.filter((item) => item.category === category);
      return itemsInCurrentCategory.slice(0, 4).map((item) => {
        const { image, title, buttonText } = item;
        return `
        <article class="subPlans">
            <h3>${title}</h3>
            <button class="like"><i class="fa-solid fa-heart"></i></button>
            <img
              src="${image}"
              alt="${title}"
            />
            <meter value="0.85" min="0.0" max="5.0"><i class="fa-solid fa-star"></i> <span>${item.stars}</span></meter>
            <i class="fa-solid fa-tag"></i>
            <p>${item.tag}</p>
            <i class="fa-solid fa-location-dot"></i>
            <address>${item.location}</address>
            <a href="./plan.html?planName=${title}&tag=${item.tag}" ><button><span>${buttonText}</span>-с эхэлье</button></a>
            </article>
            `;
      }).join('');
    });
  })
  .catch((error) => console.error('Error fetching data:', error));
