

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
                <svg xmlns="http:
                <favourite-place></favourite-place>
                <favourite-plan></favourite-plan>
                
              </a>
              <favourite-count></favourite-count>
            </section>
            <a id="logoutButton"><svg xmlns="http:
        </div>
        </nav>
    </header>
    `;


    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    
    this.shadowRoot
      .querySelector(".closebtn")
      .addEventListener("click", this.closeNav);
    this.shadowRoot
      .querySelector('span[onclick="openNav()"]')
      .addEventListener("click", this.openNav);
  }


  openNav() {
    this.shadowRoot.getElementById("myNav").style.width = "100%";
  }
  closeNav() {
    this.shadowRoot.getElementById("myNav").style.width = "0%";
  }



}

window.customElements.define("mobile-header", MobileHeader);