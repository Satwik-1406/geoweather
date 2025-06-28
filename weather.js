function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '7898410cd1a1cb98d5dfdf02c1f06f68';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            document.getElementById('weather').innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}
function getWeatherByLocation() {
  const apiKey = '7898410cd1a1cb98d5dfdf02c1f06f68';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error("Unable to fetch weather data.");
            return response.json();
          })
          .then(data => {
            const weatherCard = `
              <div class="city">${data.name}</div>
              <div class="temp">${Math.round(data.main.temp)}°C</div>
              <div class="description">${data.weather[0].main}</div>
            `;
            document.getElementById('weather-card').innerHTML = weatherCard;
          })
          .catch(error => {
            document.getElementById('weather-card').innerHTML = `<p style="color:red;">${error.message}</p>`;
          });
      },
      (error) => {
        document.getElementById('weather-card').innerHTML = `<p style="color:red;">Location access denied.</p>`;
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

