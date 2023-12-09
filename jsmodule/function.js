function getValueForFilter() {
  // Get selected values
  var huniiTooValue = document.getElementById('huniiToo').value;
  var oirhonGazarValue = document.getElementById('oirhonGazar').value;
  var typeValue = document.getElementById('type').value;

  // Display selected values
  var newUrl = "./letsgo.html" +  "?address=" + oirhonGazarValue + "&category=" + typeValue+"&countPeople=" + huniiTooValue;
  window.location.href = newUrl;
}
  




function changeColor() {
    var button = document.querySelector('.like');
    
    if (button.style.color === 'red') {
        button.style.color = 'black';
    } else {
        button.style.color = 'red';
    }
}
