document.getElementById('submit-button').addEventListener('click', createNote);

async function createNote() {
    // const urlParams = new URLSearchParams(window.location.search);
    // const title = urlParams.get('planName');
    // console.log(title);
    const titleSection = document.getElementsByClassName('placeName')[0];
    const titleElement = titleSection.getElementsByTagName('h2')[0];
    const title = titleElement.textContent;
    const contents = document.getElementById('contents').value;

    const formData = {
        title: title,
        contents: contents,
    };

    try {
        const apiUrl = 'http://localhost:8081/notes';
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
            window.alert('your comment succesfully sent');
        } else {
            console.error('Failed to create note:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}