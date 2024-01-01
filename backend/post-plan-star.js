async function printRatingValue(value) {
  const stars=value;
  const title=document.getElementsByClassName('invisible')[0].textContent;

  const formData = {
    title: title,
    stars: stars,
    // username: username,
};
console.log(formData);

try {
    const apiUrl = 'http://localhost:3000/stars';

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
        window.alert('Your rating successfully sent.');
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