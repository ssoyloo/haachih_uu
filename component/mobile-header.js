// import "../jsmodule/function";
 
class MobileHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/general.css">
      <style>
      header {
          width: 100%;
          display: flex;
          flex-direction: row;
          border-bottom-left-radius: 2rem;
          border-bottom-right-radius: 2rem;
          background-image: linear-gradient(to bottom right, var(--main-color), var(--secondary-color));
      }
      nav {
        width: 100%;
        display: flex;  
        align-items: center;
        justify-content: space-around;
      & .headerButton{
        display: flex;
        flex-direction: row;
        align-items: center;
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
          gap: 1rem;
          & svg{
            fill: white;    
          }  
        }
      }
      .overlay {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-image: linear-gradient(to bottom right, rgb(215, 97, 219), rgb(112, 217, 249));
        overflow-x: hidden;
        transition: 0.5s;
      }
     
      .overlay-content {
        position: relative;
        top: 2%;
        width: 100%;
        text-align: left;
        margin-left:2rem;
        & li {
          list-style: none;
        }
      }
     
      .overlay a{
        padding: 8px;
        text-decoration: none;
        font-size: 14px;
        color: #fff;
        display: block;
        top: -1%;
      }
     
      .overlay a:hover {
        color:rgb(98, 0, 123);
      }
     
      .overlay .closebtn {
        position: absolute;
        right: 0;
        font-size: 26px;
      }
     
      @media screen and (max-height: 450px) {
        .overlay a {font-size: 20px}
        .overlay .closebtn {
        font-size: 40px;
        top: 15px;
        right: 35px;
        }
      }
      favourite-place{
        display: none;
      }
      favourite-plan{
        display:none
      }
      </style>
      <header>
          <nav class="mobileHeader">
              <div id="myNav" class="overlay">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
              <ul class="overlay-content">
                  <li><a href="/menubar?tag=Орой яахын">Орой яахын?</a></li>
                  <li><a href="/menubar?tag=Төрсөн өдөр">Төрсөн өдөр гэсэн үү дээ?</a></li>
                  <li><a href="/menubar?tag=Арван жил">Арван жил шдээ</a></li>
                  <li><a href="/menubar?tag=">Валинтин гэсээн</a></li>
                  <li><a href="/menubar?tag=Хөдөө">Хөдөө гарья</a></li>
              </ul>
              </div>
              <span style="font-size: 30px; cursor: pointer; color: #fff" onclick="openNav()">&#9776;</span>
              <a href="/index">
              <img class="logopng1" src="/logo.png" alt="haachihuu_logo" />
              </a>
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
          </nav>
      </header>
      `;
   
      // Bind the open and close methods to 'this' context
      this.openNav = this.openNav.bind(this);
      this.closeNav = this.closeNav.bind(this);
   
      // Add event listeners for your open and close triggers
      this.shadowRoot
        .querySelector(".closebtn")
        .addEventListener("click", this.closeNav);
      this.shadowRoot
        .querySelector('span[onclick="openNav()"]')
        .addEventListener("click", this.openNav);
    }
   
    // Define the openNav method
    openNav() {
      this.shadowRoot.getElementById("myNav").style.width = "100%";
    }
   
    // Define the closeNav method
    closeNav() {
      this.shadowRoot.getElementById("myNav").style.width = "0%";
    }
  }
  // Define the custom element
  window.customElements.define("mobile-header", MobileHeader);