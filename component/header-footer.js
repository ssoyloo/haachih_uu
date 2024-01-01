class allHeader extends HTMLElement {
  constructor() {
    super();
    // this.render();
  }
  render() {
    this.innerHTML = `
    <style>
    nav {
      width: 100%;
      display: flex;  
      align-items: center;
      justify-content: space-around;
      margin: 0 2.5rem;
      & ul{
          display: flex;
          flex-direction: row;
          gap:1.82rem;
      }
      & li{
          list-style: none;
      }
      & a {
          text-decoration: none;
          color: white;
      }
      & a:hover{
          color: var(--hover-color);
      }
      & .headerButton{
          display: flex;
          flex-direction: row;
          align-items: center;
      }
      & svg {
          fill: white;    
      }
      & .logopng1{
          padding-top: 1rem;
          padding-bottom: 0.5rem;
          width:250px;
      }
      & .count {
          height: 15px;
          width: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.7rem;
          font-weight: bold;
          border: 2px solid rgb(255, 255, 255);
          border-radius: 15px;
          position: sticky;
          bottom: 0;
          margin-top: -1rem;
          background-color: #fff;
          color: transparent;
          & span {
              background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
          }
      }
      & .users{
          display: flex;
          flex-direction: row;
          gap: 0.7rem;
          & svg{
            fill: white;    
          }  
        }
  }
 
  @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
      }
      40% {
          transform: translateY(-30px);
      }
      70% {
          transform: translateY(-8px);
      }
    }
   
    .logopng1{
      animation: bounce 1.5s ease;
    }
    favourite-place{
      display: none;
    }
    favourite-plan{
      display:none
    }
   
    </style>
    <nav>
    <a href="/index">
      <img class="logopng1" src="/logo.png" alt="haachihuu_logo"/>
    </a>
    <ul>
      <li><a href="/menubar?tag=Орой яахын">Орой яахын?</a></li>
      <li><a href="/menubar?tag=Төрсөн өдөр">Төрсөн өдөр гэсэн үү дээ?</a></li>
      <li><a href="/menubar?tag=Арван жил">Арван жил шдээ</a></li>
      <li><a href="/menubar?tag=">Валинтин гэсээн</a></li>
      <li><a href="/menubar?tag=Хөдөө">Хөдөө гарья</a></li>
    </ul>
    <div class="users">
    <section class="headerButton">
      <a class="navSearch" href="/like">
        <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
        <favourite-place></favourite-place>
        <favourite-plan></favourite-plan>
        
      </a>
      <favourite-count></favourite-count>
      
    </section>
    <a id="logoutButton"><svg xmlns="http://www.w3.org/2000/svg" height="1.3em"  viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></i></a>
    </div>
  </nav>`;
  }
  connectedCallback() {
    this.render();
  }
}
 
window.customElements.define("all-header", allHeader);
 
class footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.parentNode.innerHTML = `
      <a href="index.html"><img src="/logo.png" alt="logoshdee" /></a>
        <ul class="contact">
            <li><p>Бидэнтэй холбогдох</p></li>
            <li><a href="#"><svg class="footerIcon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg> Gmail</a></li>  
            <li>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  />
                </svg>
                Instagram</a
              >
            </li>
        <li>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
              />
            </svg>
            Facebook</a
          >
        </li>
      </ul>
      <ul class="service">
        <li><p>Тусламж үйлчилгээ</p></li>
        <li><a href="#">Асуулт хариулт</a></li>
        <li><a href="#">Санал хүсэлт</a></li>
        <li><a href="#">Үйлчилгээний нөхцөл</a></li>
      </ul>
      <hr />
      <p>&copy; Haachih uu inc.2023. We love our customers.</p>
      `;
  }
}
customElements.define("all-footer", footer);


// class header extends HTMLElement {
//     constructor(){
//             super();
//     }
//     connectedCallback() {
      
//         this.parentNode.innerHTML = `
//         <nav>
//         <a href="/index">
//           <img class="logopng1" src="/logo.png" alt="haachihuu_logo"/>
//         </a>
//         <ul>
//           <li><a href="/menubar?tag=Орой яахын">Орой яахын?</a></li>
//           <li><a href="/menubar?tag=Төрсөн өдөр">Төрсөн өдөр гэсэн үү дээ?</a></li>
//           <li><a href="/menubar?tag=Арван жил">Арван жил шдээ</a></li>
//           <li><a href="/menubar">Валинтин гэсээн</a></li>
//           <li><a href="/menubar?tag=Хөдөө">Хөдөө гарья</a></li>
//         </ul>
//         <section class="headerButton">
        
//           <favourite-plan></favourite-plan>
//           <favourite-place></favourite-place>
//         </section>
//         <button id="logoutButton">Logout</button>
//       </nav>
//             `;
// }
// }
// customElements.define("all-header", header);

// class footer extends HTMLElement {
//     constructor(){
//             super();
//     }
//     connectedCallback() {
//             this.parentNode.innerHTML = `
//             <a href="index.html"><img src="/logo.png" alt="bla2" /></a>
//         <ul>
//             <li><p>Бидэнтэй холбогдох</p></li>
//             <li><a href="#"><svg class="footerIcon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg> Gmail</a></li>
           
//         <li>
//           <a href="#">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="1em"
//               viewBox="0 0 448 512"
//             >
//               <path
//                 d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
//               />
//             </svg>
//             Instagram</a
//           >
//         </li>
//         <li>
//           <a href="#">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="1em"
//               viewBox="0 0 512 512"
//             >
//               <path
//                 d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
//               />
//             </svg>
//             Facebook</a
//           >
//         </li>
//       </ul>
//       <ul>
//         <li><p>Тусламж үйлчилгээ</p></li>
//         <li><a href="#">Асуулт хариулт</a></li>
//         <li><a href="#">Санал хүсэлт</a></li>
//         <li><a href="#">Үйлчилгээний нөхцөл</a></li>
//       </ul>
//       <hr />
//       <p>&copy; Haachih uu inc.2023. We love our customers.</p>
//             `;
// }
// }
// customElements.define("all-footer", footer);