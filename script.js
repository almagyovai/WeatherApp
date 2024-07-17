const apiKey = 'e5eb0575dd9189d8a5f1a35946d8ef58';

function fetchWeatherData(city) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
    .then(response => {
        if (!response.ok) {
            alert('City not found');
            throw new Error('City not found');
        }
        return response.json();
    })
    .then(data => {
        let cityName = data.name;
        let temperature = data.main.temp;
        let description = data.weather[0].description;
        let weatherIcon = data.weather[0].icon;

        document.getElementById('cityName').innerText = `City: ${cityName}`;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('description').innerText = `Description: ${description}`;

        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

        document.getElementById('weatherIcon').src = iconUrl;

        return fetch(forecastApiUrl);
    })
    .then(response => response.json())
    .then(forecastData => {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';

        const forecastList = forecastData.list.filter(entry => entry.dt_txt.includes("12:00:00"));

        forecastList.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();
            const temp = day.main.temp;
            const desc = day.weather[0].description;
            const weatherIcon = day.weather[0].icon; 

            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');
            
            forecastDay.innerHTML = `
                <h4>${date}</h4>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>${temp}°C</p>
                <p>${desc}</p>
            `;
            
            forecastContainer.appendChild(forecastDay);
        });
    })
    .catch(error => {
        alert(error.message);
    });
}

document.getElementById('getWeather').addEventListener('click', function() {
    let city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    fetchWeatherData(city);
});

window.onload = function() {
    const defaultCity = 'Timişoara'; 
    fetchWeatherData(defaultCity);
}