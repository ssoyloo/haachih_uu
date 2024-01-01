

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {

            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {

                        window.location.href = '/';
                    } else {

                        alert(data.message);
                    }
                })
            location.reload()
        });
    }
});

function getValueForFilter() {
    // Get selected values
    var huniiTooValue = document.getElementById('huniiToo').value;
    var oirhonGazarValue = document.getElementById('oirhonGazar').value;
    var typeValue = document.getElementById('type').value;
  //   var starCheckboxes = document.querySelectorAll('#star input[type="checkbox"]:checked');
  //   var starValues = Array.from(starCheckboxes).map(checkbox => checkbox.value);
   
  //   // Get selected detail values
  //   var detailCheckboxes = document.querySelectorAll('#detail input[type="checkbox"]:checked');
  //   var detailValues = Array.from(detailCheckboxes).map(checkbox => checkbox.value);
   
    // Display selected values
    var newUrl1 = "/letsgo" +  "?address=" + oirhonGazarValue + "&category=" + typeValue+"&countPeople=" + huniiTooValue ;
    window.location.href = newUrl1;
   
  }
   
   
  function sideFilter() {
      // Get selected star values
      var starCheckboxes = document.querySelectorAll('#star input[type="checkbox"]:checked');
      var starValues = Array.from(starCheckboxes).map(checkbox => checkbox.value);
   
      // Get selected detail values
      var detailCheckboxes = document.querySelectorAll('#detail input[type="checkbox"]:checked');
      var detailValues = Array.from(detailCheckboxes).map(checkbox => checkbox.value);
   
      // Construct the new URL
      var newUrl = "/letsgo" + "?star=" + starValues.join(',') + "&detail=" + detailValues.join(',');
      window.location.href = newUrl;
    }


    customElements.define(
        "element-details",
        class extends HTMLElement {
          constructor() {
            super();
            const template = document.getElementById(
              "element-details-template",
            ).content;
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.cloneNode(true));
          }
        },
      );
   
   
