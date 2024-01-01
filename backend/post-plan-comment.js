
document.getElementById('submit-button').addEventListener('click', createNote);

async function createNote() {
    // const urlParams = new URLSearchParams(window.location.search);
    // const title = urlParams.get('planName');
    const contentsInput = document.getElementById('contents');
    const contents = contentsInput.value;
    console.log(contents);
    // const username="random guy";
    // console.log(username);
    const title=document.getElementsByClassName('invisible')[0].textContent;
    console.log(title);
    
    
    
    // const userId = req.session.username;
    // console.log(userId);

    // Check if the 'contents' field is empty
    if (!contents) {
        window.alert('Please enter contents before submitting.');
        return;
    }

    const formData = {
        title: title,
        contents: contents,
        // username: username,
    };

    try {
        const apiUrl = 'http://localhost:3000/notes';
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Response Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Note created:', data);
            window.alert('Your comment was successfully sent.');
        } else {
            const errorText = await response.text();
            console.error('Failed to create note:', response.status, errorText);
            window.alert('Failed to create note. Please check the console for more details.');
        }
    } catch (error) {
        console.error('Error:', error);
        window.alert('An error occurred. Please check the console for more details.');
    }
}