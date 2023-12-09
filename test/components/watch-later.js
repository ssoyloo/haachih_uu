// class WatchLaterList {
//         constructor(movies){
//                 this.movie = movies;
//                 console.log(movies.type,"hi");
//         }

//         render_later_list() {
//                 return `
//                 <div class="fullMovie">
//                         <a class="no_dec" href="./detail.html">
//                                 <div class="movie-img">
//                                         <div class="background_list" style="background:url(
//                                                 ${this.movie.image}
//                                         );">
//                                         </div>
//                                 </div>
//                         </a>
//                         <div class="movie-detail">
//                                 <div class="movie-head">
//                                         <p class="movie-title"><i>${this.movie.name}</i>  </p>
//                                 </div>
//                                 <div class="movie-footer">
//                                         <div class="types">
//                                                 <span class="element">${this.movie.type}</span>               
//                                         </div>
//                                 </div>        
//                         </div>
//                 </div>`
//                 ;
//         }
// }

// class WatchLaterComponent extends HTMLElement {
//         constructor() {
//                 super(); 
//                 this.lists = [];
//                 this.className = "watch";
//                 this.returnValue = "";
//                 this.watchNum = 0;
//                 if(JSON.parse(localStorage.getItem('lists'))){
//                         const listJSON = JSON.parse(localStorage.getItem('lists'));
//                         this.watchNum = listJSON.length;
//                 }
//                 else{
//                         const listJSON = [];
//                 }
//                 this.render_watch();
//         }

//         render_watch() {
//                 if(!JSON.parse(localStorage.getItem('lists'))){
//                         this.watchNum = 0;
//                 }
//                 this.innerHTML = `
//                         <div class="watch-list-container">
//                                 <img src="../images/clock.svg" alt="watch cart">
//                                 <p class="product-count" style="font-weight: bold;">${this.watchNum}</p>
//                         </div>
//                 `;
//         }

//         addToCart(myProduct) {
//                 this.lists.push(myProduct);
                
//                 const product = new WatchLaterList(myProduct);

//                 // console.log(product);
//                 this.listJSON.push(myProduct); //json array luuga shine jsonobject nemeh

//                 localStorage.setItem("lists", JSON.stringify(this.listJSON)); //local storaged jsonoo hadgalna
//                 this.watchNum++;
//                 this.render_watch();
//                 this.returnValue += product.render_later_list();
//         }
//         jsonToCard(){
//                 if(JSON.parse(localStorage.getItem('lists'))){
//                         const lists = JSON.parse(localStorage.getItem('lists'));
//                         for(const data of lists){
//                                 const product = new WatchLaterList(data);
//                                 this.returnValue += product.render_later_list();
//                         }
//                         if(document.querySelector(".watch-later-lists")){
//                                 document.querySelector(".watch-later-lists").insertAdjacentHTML("beforeend",this.returnValue);
//                         }
//                 }
//                 else{
//                         if(document.querySelector(".watch-later-lists")){
//                                 document.querySelector(".watch-later-lists").innerHTML = `<style>.checkout-button{display:none;}</style><h2 class="baihgui">Дараа үзэх кино байхгүй байна.</h2>`;
//                         }
//                 }
//         }
//         connectedCallback() {
//                 if(localStorage.getItem("lists")){
//                         this.listJSON = JSON.parse(localStorage.getItem("lists"));
//                         this.watchNum = this.listJSON.length;
//                 }
//                 else{
//                         this.listJSON = [];
//                 }
//                 this.jsonToCard();
//         }
//         disconnectedCallback() {

//         }
//         get productCount() {
//                 return this.watchNum;
//         }
// }
// window.customElements.define('later-comp', WatchLaterComponent);
