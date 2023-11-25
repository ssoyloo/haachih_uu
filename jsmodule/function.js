function getValueForFilter() {
  // Get selected values
  var huniiTooValue = document.getElementById('huniiToo').value;
  var oirhonGazarValue = document.getElementById('oirhonGazar').value;
  var typeValue = document.getElementById('type').value;

  // Display selected values
  var newUrl = "./letsgo.html" + "?countPeople=" + huniiTooValue + "&oirhonGazar=" + oirhonGazarValue + "&type=" + typeValue;
  window.location.href = newUrl;
}



function addtocart(id){
  console.log(id);
  fetch('https://api.jsonbin.io/v3/b/655af05f12a5d376599bf455', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$ojy46PjtmXRJDQjfPEd.7uSpFBHtMSZru2saOVPBo.Tewq749YNzS'
                },
                body: JSON.stringify([
                    {
                        id: id
                    }
                ])
            })
            .then(function(response) {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(function(data) {
              console.log("Response:", data);
          })
          .catch(function(error) {
              console.error('Error:', error);
              if (error.response) {
                  console.error('Response status:', error.response.status);
                  console.error('Response text:', error.response.statusText);
              }
          });
  
  
}
function changeColor() {
    var button = document.querySelector('.like');
    
    if (button.style.color === 'red') {
        button.style.color = 'black';
    } else {
        button.style.color = 'red';
    }
}
