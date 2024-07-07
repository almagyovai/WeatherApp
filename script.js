
document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const apiKey = 'e5eb0575dd9189d8a5f1a35946d8ef58';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=city&appid=e5eb0575dd9189d8a5f1a35946d8ef58&units=metric`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
           alert('City not found');
        }
        return response.json();
    })
    .then(data => {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        document.getElementById('cityName').innerText = `City: ${cityName}`;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('description').innerText = `Description: ${description}`;
    })
    .catch(error => {
        alert(error.message);
    });
});