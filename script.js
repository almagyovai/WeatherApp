
document.getElementById('getWeather').addEventListener('click', function() {
    let city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const apiKey = 'e5eb0575dd9189d8a5f1a35946d8ef58';
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

        document.getElementById('cityName').innerText = `City: ${cityName}`;
        document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
        document.getElementById('description').innerText = `Description: ${description}`;

        return fetch(forecastApiUrl);
    })
    .then(response => response.json())
    .then(forecastData => {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';

        // Filter the forecast data to get one entry per day at noon (12:00)
        const forecastList = forecastData.list.filter(entry => entry.dt_txt.includes("12:00:00"));

        forecastList.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();
            const temp = day.main.temp;
            const desc = day.weather[0].description;

            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');
            
            forecastDay.innerHTML = `
                                        <h3>5-Day Forecast</h3>
                <div id="forecast-container">


                <h4>${date}</h4>
                <p>${temp}°C</p>
                <p>${desc}</p>
</div>
            `;
            
            forecastContainer.appendChild(forecastDay);
        });
    })
    .catch(error => {
        alert(error.message);
    });
});