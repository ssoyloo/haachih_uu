// class header extends HTMLElement {
//     constructor(){
//             super();
//     }
//     connectedCallback() {
//         this.parentNode.innerHTML = `
//             <div class="header_main">
//                 <div class="header_logo">
//                     <div class="head_img">
//                         <img src="../images/logo.webp" alt="MovieMax" />
//                     </div>
//                     <div class="links">
//                         <a href="./home.html">Эхлэл</a>
//                         <a href="./movie.html">Бүрэн хэмжээний</a>
//                         <a href="./series.html">Цуврал</a>
//                         <a href="./favorite.html">Дуртай</a>
//                         <a href="./payment.html">Эрх нээлгэх</a>
//                     </div>
//                 </div>
//                 <later-comp onclick="location.href='./watch-later.html'"></later-comp>
//                 <div class="dropdown">
//                     <img src="../images/user.svg" alt="user" onclick="show_dropdowns()"/>
//                     <div class="dropdown-content" id="dropdown_contents">
//                         <a href="./settings.html">
//                             <p>Тохиргоо</p>
//                         </a>
//                         <a href="../index.html">
//                             <p>Гарах</p>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             `;
// }
// }
// customElements.define("moviemax-header", header);

// class footer extends HTMLElement {
//     constructor(){
//             super();
//     }
//     connectedCallback() {
//             this.parentNode.innerHTML = `
//             <img src="../images/logo.webp" alt="logo" >
//             <address>
//               Байршил: <span>Чингисийн өргөн чөлөө, СБД, Улаанбаатар</span> <br>
//               Имэйл: <span>moviemax@mo.mn</span> <br>
//               Утас: <span>94399344</span>
//             </address>
//             `;
// }
// }
// customElements.define("moviemax-footer", footer);