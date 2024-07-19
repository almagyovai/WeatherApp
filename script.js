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

            document.getElementById('cityName').innerText = `Location: ${cityName}`;
            document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
            document.getElementById('description').innerText = `Description: ${description}`;

            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

            document.getElementById('weatherIcon').src = iconUrl;

            setBackground(description);

            return fetch(forecastApiUrl);
        })
        .then(response => response.json())
        .then(forecastData => {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            const forecastList = forecastData.list.filter(entry => entry.dt_txt.includes("12:00:00"));

            forecastList.forEach(day => {
                const date = new Date(day.dt_txt);
                const formattedDate = date.toLocaleDateString(); // Format date as 'MM/DD/YYYY'
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
                const temp = day.main.temp;
                const desc = day.weather[0].description;
                const weatherIcon = day.weather[0].icon;

                const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

                const forecastDay = document.createElement('div');
                forecastDay.classList.add('forecast-day');
                
                forecastDay.innerHTML = `
                    <h4>${dayOfWeek}</h4>
                    <h4>${formattedDate}</h4>
                    <img src="${iconUrl}" class="forecast-weather" alt="Weather Icon">
                    <p class="temp"><span class="Poppins-font">${temp}°C</span></p>
                    <p class="desc">${desc}</p>
                `;
                
                forecastContainer.appendChild(forecastDay);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

function setBackground(description) {
    let gradient;
    switch (description.toLowerCase()) {
        case 'clear sky':
            gradient = 'linear-gradient(to bottom, #87CEEB, #4682B4)';
            break;
        case 'few clouds': 
            gradient = 'linear-gradient(to bottom, #E0FFFF, #87CEFA)';
            break;
        case 'scattered clouds':
            gradient = 'linear-gradient(to bottom, #FFC0CB, #B0E0E6)';
            break;
        case 'overcast clouds':
            gradient = 'linear-gradient(to bottom, #B0C4DE, #696969)';
            break;
        case 'broken clouds':
            gradient = 'linear-gradient(to bottom, #E0FFFF, #D3D3D3)';
            break;
        case 'shower rain':
        case 'rain':
            gradient = 'linear-gradient(to bottom, #9bc1e4, #4a6fa5)';
            break;
        case 'thunderstorm':
            gradient = 'linear-gradient(to bottom, #4a6fa5, #1f2c37)';
            break;
        case 'snow':
            gradient = 'linear-gradient(to bottom, #f5f5f5, #b3e5fc)';
            break;
        case 'mist':
            gradient = 'linear-gradient(to bottom, #f3e5f5, #e1bee7)';
            break;
            }
            
    document.body.style.background = gradient;
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

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('city');
    
    function adjustInputWidth() {
        // Create a temporary span to measure the input's value width
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'nowrap';
        span.textContent = input.value || input.placeholder;
        document.body.appendChild(span);
    
        // Set the input width to the width of the text plus some padding
        input.style.width = `${span.offsetWidth + 10}px`;
    
        // Clean up the temporary span
        document.body.removeChild(span);
    }
    
    // Adjust the width initially
    adjustInputWidth();
    
    // Adjust the width on input event
    input.addEventListener('input', adjustInputWidth);
});
