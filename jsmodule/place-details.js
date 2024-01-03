window.onload = () => {
  const name_ = sessionStorage.getItem("name");
  const category_ = sessionStorage.getItem("category");

  const places = new CategoryPlace(
    "https://api.jsonbin.io/v3/b/65925eb5266cfc3fde710003"
  );
  places.Download("newPlaces", category_, name_);
  fill();
};

function fill() {
  console.log("Window loaded!");

  var ner = document.getElementById("name");
  var location = document.getElementById("location");
  var hours = document.getElementById("hour");
  var introduction = document.getElementById("introduction");
  var capacity = document.getElementById("capacity");
  var category = document.getElementById("category");

  var wifi = document.getElementById("wifi");
  var parking = document.getElementById("parking");
  var noice = document.getElementById("noice");
  var speaker = document.getElementById("speaker");
  var mic = document.getElementById("mic");
  var vip = document.getElementById("vip");

  var name_ = sessionStorage.getItem("name");
  var category_ = sessionStorage.getItem("category");
  var location_ = sessionStorage.getItem("address");
  var hours_ = sessionStorage.getItem("hours");
  var intro_ = sessionStorage.getItem("intro");
  var capacity_ = sessionStorage.getItem("capacity");
  var wifi_ = sessionStorage.getItem("wifi");
  var parking_ = sessionStorage.getItem("parking");
  var noice_ = sessionStorage.getItem("noice");
  var vip_ = sessionStorage.getItem("vip");
  var mic_ = sessionStorage.getItem("mic");
  var spkr_ = sessionStorage.getItem("spkr");

  console.log(ner);
  console.log(name_);
  console.log(location_);
  console.log("wifi " + wifi_);
  console.log("park " + parking_);
  console.log("mic " + mic_);
  console.log("noice " + noice_);
  console.log("vip " + vip_);
  console.log("spkr " + spkr_);
  console.log("cat " + category_);

  hours.innerHTML = hours_;
  ner.innerHTML = name_;
  category.innerHTML = category_;
  location.innerHTML = location_;
  introduction.innerHTML = intro_;
  capacity.innerHTML = "Багтаамж " + capacity_;

  mic.src = mic_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
  parking.src = parking_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
  vip.src = vip_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
  noice.src = noice_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
  speaker.src = spkr_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
  wifi.src = wifi_ === "true" ? "/checkmark_green.png" : "/checkmark_red.png";
}

class Place_ {
  constructor(ob) {
    this.name = ob.name;
    this.image = ob.image;
    this.stars = ob.stars;
    this.category = ob.category;
    this.address = ob.address;
    this.phone = ob.phone;
    this.intro = ob.introduction;
    this.buttonText = ob.buttonText;
    this.hours = ob.hours;
    this.capacity = ob.countPeople;
    this.wifi = ob.freewifi;
    this.parking = ob.parking;
    this.noice = ob.noice;
    this.vip = ob.VIProom;
    this.mic = ob.microphone;
    this.spkr = ob.speaker;
  }

  render() {
    return `
    <place-comp
    name="${this.name}"
    image="${this.image}"
    category="${this.category}"
    address="${this.address}"
    phone="${this.phone}"
    intro="${this.intro}"
    hours="${this.hours}"
    capacity="${this.capacity}"
    wifi="${this.wifi}"
    parking="${this.parking}"
    noice="${this.noice}"
    vip="${this.vip}"
    mic="${this.mic}"
    spkr="${this.spkr}"
    buttonText="${this.buttonText}"
    >
    </place-comp>
      `;
  }
}

class CategoryPlace {
  constructor(placeUrl) {
    this.placeUrl = placeUrl;
  }

  Download(targetElement, cat, Name) {
    fetch(`${this.placeUrl}`)
      .then((result) => {
        result.json().then((jsob) => {
          const filteredPlace = jsob.record.filter(
            (filter) => filter.category == cat
          );
          const keys = Object.keys(filteredPlace);
          const length = keys.length;

          console.log(length);

          if (length == 0) {
            gebi(targetElement).insertAdjacentHTML("afterbegin", "yuchalga");
          } else {
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredPlace
                .map((map) => {
                  const _map = new Place_(map);
                  return _map.render();
                })
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error catch");
      });
  }
}

const gebi = (id) => document.getElementById(id);
