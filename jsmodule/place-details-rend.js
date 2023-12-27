window.onload = () => {
    console.log("Window loaded!");
   
    const ner = document.getElementById("name");
    const dugaar = document.getElementById("phone");
    const location = document.getElementById("location");
    const introduction = document.getElementById("introduction");
    const capacity = document.getElementById("capacity");
   
    const wifi = document.getElementById("wifi");
    const parking = document.getElementById("parking");
    const noice = document.getElementById("noice");
    const speaker = document.getElementById("speaker");
    const mic = document.getElementById("mic");
    const vip = document.getElementById("vip");
   
    const name_ = sessionStorage.getItem("name");
    const image_ = sessionStorage.getItem("image");
    const category_ = sessionStorage.getItem("category");
    const location_ = sessionStorage.getItem("address");
   
    const intro_ = sessionStorage.getItem("intro");
    const capacity_ = sessionStorage.getItem("capacity");
    const wifi_ = sessionStorage.getItem("wifi");
    const parking_ = sessionStorage.getItem("parking");
    const noice_ = sessionStorage.getItem("noice");
    const vip_ = sessionStorage.getItem("vip");
    const mic_ = sessionStorage.getItem("mic");
    const spkr_ = sessionStorage.getItem("spkr");
   
    console.log(name_);
    console.log(location_);
    console.log("wifi " + wifi_);
    console.log("park " + parking_);
    console.log("mic " + mic_);
    console.log("noice " + noice_);
    console.log("vip " + vip_);
    console.log("spkr " + spkr_);
   
    mic.src = mic_ ? "zurag/checkmark_green.png" : "zurag/checkmark_red.png";
    wifi.src = wifi_ ? "zurag/checkmark_green.png" : "zurag/checkmark_red.png";
    parking.src = parking_
      ? "zurag/checkmark_green.png"
      : "zurag/checkmark_red.png";
    vip.src = vip_ ? "zurag/checkmark_green.png" : "zurag/checkmark_red.png";
    noice.src = noice_ ? "zurag/checkmark_green.png" : "zurag/checkmark_red.png";
    speaker.src = spkr_ ? "zurag/checkmark_green.png" : "zurag/checkmark_red.png";
   
    ner.innerHTML = name_;
    dugaar.innerHTML = name_;
    location.innerHTML = location_;
    introduction.innerHTML = intro_;
    capacity.innerHTML = "Багтаамж " + capacity_;
  };
   
  // <img
  //   src="zurag/checkmark_green.png"
  //   class="checkmark"
  //   alt="green_checkmark"
  // ></img>;
   
  // <img
  //   src="zurag/checkmark_red.png"
  //   class="checkmark"
  //   alt="green_checkmark"
  // ></img>;
   