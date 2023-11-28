function getValueForFilter() {
  // Get selected values
  var huniiTooValue = document.getElementById('huniiToo').value;
  var oirhonGazarValue = document.getElementById('oirhonGazar').value;
  var typeValue = document.getElementById('type').value;

  // Display selected values
  var newUrl = "./letsgo.html" + "?countPeople=" + huniiTooValue + "&oirhonGazar=" + oirhonGazarValue + "&type=" + typeValue;
  window.location.href = newUrl;
}



function addtocart(id) {
    // Fetch current data
    fetch('https://api.jsonbin.io/v3/b/655af05f12a5d376599bf455', {
        method: 'GET',
        headers: {
            'X-Master-Key': '$2a$10$ojy46PjtmXRJDQjfPEd.7uSpFBHtMSZru2saOVPBo.Tewq749YNzS'
        }
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(function(data) {
        // Ensure data is an array
        if (!Array.isArray(data)) {
            data = [];
        }

        // Check if the ID already exists in the array
        const idExists = data.some(function(item) {
            return item.id === id;
        });

        // If the ID does not exist, append it to the array
        if (!idExists) {
            data.push({
                id: id
            });
        }

        // Update data on the server
        return fetch('https://api.jsonbin.io/v3/b/655af05f12a5d376599bf455', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$ojy46PjtmXRJDQjfPEd.7uSpFBHtMSZru2saOVPBo.Tewq749YNzS'
            },
            body: JSON.stringify(data)
        });
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
