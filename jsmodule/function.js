function getValueForFilter() {
  // Get selected values
  var huniiTooValue = document.getElementById("huniiToo").value;
  var oirhonGazarValue = document.getElementById("oirhonGazar").value;
  var typeValue = document.getElementById("type").value;
  //   var starCheckboxes = document.querySelectorAll('#star input[type="checkbox"]:checked');
  //   var starValues = Array.from(starCheckboxes).map(checkbox => checkbox.value);

  //   // Get selected detail values
  //   var detailCheckboxes = document.querySelectorAll('#detail input[type="checkbox"]:checked');
  //   var detailValues = Array.from(detailCheckboxes).map(checkbox => checkbox.value);

  // Display selected values
  var newUrl1 =
    "./letsgo.html" +
    "?address=" +
    oirhonGazarValue +
    "&category=" +
    typeValue +
    "&countPeople=" +
    huniiTooValue;
  window.location.href = newUrl1;
}

function sideFilter() {
  // Get selected star values
  var starCheckboxes = document.querySelectorAll(
    '#star input[type="checkbox"]:checked'
  );
  var starValues = Array.from(starCheckboxes).map((checkbox) => checkbox.value);

  // Get selected detail values
  var detailCheckboxes = document.querySelectorAll(
    '#detail input[type="checkbox"]:checked'
  );
  var detailValues = Array.from(detailCheckboxes).map(
    (checkbox) => checkbox.value
  );

  // Construct the new URL
  var newUrl =
    "./letsgo.html" +
    "?star=" +
    starValues.join(",") +
    "&detail=" +
    detailValues.join(",");
  window.location.href = newUrl;
}

function changeColor() {
  var button = document.querySelector(".like");

  if (button.style.color === "red") {
    button.style.color = "black";
  } else {
    button.style.color = "red";
  }
}
