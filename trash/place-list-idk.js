// class PlaceList extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: "open" });
//       this.places = [];
//     }
   
//     connectedCallback() {
//       this.fetchPlaces();
//     }
   
//     attributeChangedCallback(name, oldValue, newValue) {
//       if (name === "selected-category" && oldValue !== newValue) {
//         this.fetchPlaces();
//       }
//     }
   
//     async fetchPlaces() {
//       try {
//         const response = await fetch(
//           `https://api.jsonbin.io/v3/b/65642e6812a5d376599f7004`
//         );
   
//         if (response.status === 429) {
//           console.warn(
//             "API Requests exhausted. Consider upgrading your plan or waiting for the limit to reset."
//           );
//           return;
//         }
   
//         const data = await response.json();
//         this.places = data.record || [];
//         this.slicePlace();
//         this.render();
//       } catch (error) {
//         console.error("Error fetching places:", error);
//       }
//     }
   
//     slicePlace() {
//       this.places = this.places.slice(0, 6);
//     }
   
//     render() {
//       const places = this.places || [];
   
//       this.shadowRoot.innerHTML = `
//           <style>
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
//             <link rel="stylesheet" href="../css/general.css">
//             .newPlaces {
//               display: grid;
//               grid-template-columns: repeat(3, 1fr);
//               grid-template-rows: repeat(2, 1fr);
//               gap: 1rem;
//               & .subNewPlaces {
//                   display: flex;
//                   background-color: #fff;
//                   border: 1px solid #ccc;
//                   max-width: 100%;
//                   border-radius: 20px;
//                   max-height: 100%;
//                   & .image {
//                       flex: 1;
//                       max-width: 300px;
//                   }
//                   & .details {
//                       flex: 1;
//                       margin: 1rem;
           
//                       & .value{
//                         margin-top: 2%;
//                         text-align: center;
//                         margin-left: 24%;
//                         border-radius: 0.5rem;
//                     }
                   
//                   }
//               }
//               & .subNewPlaces img{
//                   height: 100%;
//                   width: auto;
//                   border-radius: 1rem;
//               }
//             }
     
//           </style>
//           <h2>Шинээр нэмэгдсэн</h2>
//           <section class='newPlaces'>
//               ${places
//                 .map(
//                   (place) => `
//               <article class="subNewPlaces">
//               <div class="image">
//                   <img src="${place.image}" alt="${
//                     place.name
//                   }"> <!-- Change 'this.image' to 'place.image' -->
//               </div>
//               <div class="details">
             
//                   <h3>${
//                     place.name
//                   }</h3> <!-- Change 'this.name' to 'place.name' -->
//                   <button @click="${() =>
//                     this.handleAddToCart(plan)}">Add to Cart</button>
//                   <p>${
//                     place.category
//                   }</p> <!-- Change 'this.category' to 'place.category' -->
//                   <address>${
//                     place.address
//                   }</address> <!-- Change 'this.address' to 'place.address' -->
//                   <i class="far fa-clock"></i>
//                   <time>${
//                     place.hours
//                   }</time><br> <!-- Change 'this.hours' to 'place.hours' -->
//                   <a href="./place.html"><button class="value" ><span>${
//                     place.buttonText
//                   }</span>К -с эхэлнэ</button></a>
                 
//               </div>
//           </article>
//               `
//                 )
//                 .join("")}
//           </section>
//         `;
//     }
   
//     handleAddToCart(place) {
//       this.dispatchEvent(new CustomEvent("add-to-cart", { detail: { place } }));
//     }
//   }
   
//   customElements.define("place-list", PlaceList);