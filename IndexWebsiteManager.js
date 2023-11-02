//plans beginning
let codeExecuted = false;
document.addEventListener('DOMContentLoaded', function() {
  if (!codeExecuted) {
    codeExecuted = true;
    const plansSection = document.querySelector('.plans');
    const plansData = 
    [
      {
        "title": "Топ 1",
        "image": "https://www.selenatravel.com/upload/media/default/0001/01/thumb_856_default_big.jpeg",
        "evaluation": 85,
        "tag": "Орой яахын",
        "location": "УБ, 2-р хороо - СБД, Шарга нуур",
        "buttonText": "100 К-с эхэлье"
      },
      {
        "title": "Топ 2",
        "image": "https://www.selenatravel.com/upload/media/default/0001/01/thumb_856_default_big.jpeg",
        "evaluation": 70,
        "tag": "Орой яахын",
        "location": "УБ, 3-р хороо - СБД, Нарантуул",
        "buttonText": "200 К-с эхэлье"
      },
      {
        "title": "Топ 3",
        "image": "https://www.selenatravel.com/upload/media/default/0001/01/thumb_856_default_big.jpeg",
        "evaluation": 95,
        "tag": "Орой яахын",
        "location": "УБ, 4-р хороо - СБД, Өргөөт",
        "buttonText": "300 К-с эхэлье"
      },
      {
        "title": "Топ 4",
        "image": "https://www.selenatravel.com/upload/media/default/0001/01/thumb_856_default_big.jpeg",
        "evaluation": 75,
        "tag": "Орой яахын",
        "location": "УБ, 5-р хороо - СБД, Баянзүрх",
        "buttonText": "400 К-с эхэлье"
      }
    ];

    

    plansData.forEach(plan => {
      const article = document.createElement('article');
      article.classList.add('subPlans');

      article.innerHTML = `
        
        <img src="${plan.image}" alt="top${plan.title}">
        <h3>${plan.title}</h3>
        <meter value="${plan.evaluation / 100}" min="0.0" max="1.0">${plan.evaluation}%</meter>
        <i class="fa-solid fa-tag"></i>
        <p>${plan.tag}</p>
        <i class="fa-solid fa-location-dot"></i>
        <address>${plan.location}</address>
        <a href="./plan.html"><button><span>${plan.buttonText}</span></button></a>
      `;

      plansSection.appendChild(article);
    });
  }


//recommendPlaces section is ending here and new places starting from here
const subRecommendPlacesSection = document.querySelector(".subRecommend");

const recommendPlacesData = [
  {
    image: "./zurag/sura.jpg",
    title: "Sura",
    category: "Хоолны газар",
    address: "СБД, 1-р хороо - УБ, Сөүл гудамж",
    hours: "7:30-21:00",
    button: {
      text: "20",
      action: "К-с эхэлье"
    }
  },
  {
    image: "./zurag/sura.jpg",
    title: "Another Place",
    category: "Хоолны газар",
    address: "СБД, 2-р хороо - УБ, Сөүл гудамж",
    hours: "8:00-20:30",
    button: {
      text: "15",
      action: "К-с эхэлье"
    }
  },
  {
    image: "./zurag/sura.jpg",
    title: "Another Place",
    category: "Хоолны газар",
    address: "СБД, 2-р хороо - УБ, Сөүл гудамж",
    hours: "8:00-20:30",
    button: {
      text: "15",
      action: "К-с эхэлье"
    }
  }
  
];

recommendPlacesData.forEach((place) => {
  const article = document.createElement('article');
  article.classList.add('RecommendPlacesToFlex');
  article.innerHTML = `
    <div class="image">
      <img src="${place.image}" alt="${place.title}">
    </div>
    <div class="details">
      <h3>${place.title}</h3>
      <p>${place.category}</p>
      <address>${place.address}</address>
      <i class="far fa-clock"></i>
      <time>${place.hours}</time><br> 
      <button><span>${place.button.text}</span>${place.button.action}</button>
    </div>
  `;

  subRecommendPlacesSection.appendChild(article);
});


//new starting from here

  const newPlacesSection = document.querySelector('.newPlaces');

    const newPlacesData = [
      {
        image: "./zurag/sura.jpg",
        title: "Place 1",
        category: "Category 1",
        address: "Address 1",
        hours: "8:00-22:00",
        buttonText: "Book Now"
      },
      {
        image: "./zurag/sura.jpg",
        title: "Place 2",
        category: "Category 2",
        address: "Address 2",
        hours: "9:00-23:00",
        buttonText: "Book Now"
      },
      {
        image: "./zurag/sura.jpg",
        title: "Place 3",
        category: "Category 3",
        address: "Address 3",
        hours: "10:00-20:00",
        buttonText: "Book Now"
      },
      {
        image: "./zurag/sura.jpg",
        title: "Place 4",
        category: "Category 4",
        address: "Address 4",
        hours: "7:30-21:00",
        buttonText: "Book Now"
      },
      {
        image: "./zurag/sura.jpg",
        title: "Place 5",
        category: "Category 5",
        address: "Address 5",
        hours: "11:00-19:00",
        buttonText: "Book Now"
      },
      {
        image: "./zurag/sura.jpg",
        title: "Place 6",
        category: "Category 6",
        address: "Address 6",
        hours: "12:00-18:00",
        buttonText: "Book Now"
      }
    ];

  newPlacesData.forEach(place => {
    const article = document.createElement('article');
    article.classList.add('subNewPlaces');

    article.innerHTML = `
      <div class="image">
        <img src="${place.image}" alt="${place.title}">
      </div>
      <div class="details">
        <h3>${place.title}</h3>
        <p>${place.category}</p>
        <address>${place.address}</address>
        <i class="far fa-clock"></i>
        <time>${place.hours}</time><br> 
        <button><span>${place.buttonText}</span></button>
      </div>
    `;

    newPlacesSection.appendChild(article);
  });




});
