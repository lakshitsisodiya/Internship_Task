  const form = document.getElementById("weather-form");
    const cityInput = document.getElementById("city-input");
    const useLocationBtn = document.getElementById("use-location");
    const outputDiv = document.getElementById("weather-output");
    const API_KEY = //" Replace with your own API key"; 
    
    // When form is submitted
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = cityInput.value.trim();
      if (city) {
        fetchWeatherByCity(city);
      } else {
        outputDiv.innerHTML = `<p>Please enter a city name 🏙️</p>`;
      }
    });

    // When "Use My Location" is clicked
    useLocationBtn.addEventListener("click", () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          () => {
            outputDiv.innerHTML = `<p>❌ Location permission denied.</p>`;
          }
        );
      } else {
        outputDiv.innerHTML = `<p>Your browser doesn't support location 📍</p>`;
      }
    });

    // Fetch weather by city name
    function fetchWeatherByCity(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      fetchWeather(url);
    }

    // Fetch weather by coordinates
    function fetchWeatherByCoords(lat, lon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      fetchWeather(url);
    }

    // Common fetch function
    function fetchWeather(url) {
      outputDiv.innerHTML = `<p>🌍 Fetching weather info...</p>`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            const weatherHTML = `
              <div class="info-block">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temp: ${data.main.temp}°C</p>
                <p>🌥️ Condition: ${data.weather[0].main} (${data.weather[0].description})</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind: ${data.wind.speed} m/s</p>
              </div>
            `;
            outputDiv.innerHTML = weatherHTML;
          } else {
            outputDiv.innerHTML = `<p>❌ ${data.message}</p>`;
          }
        })
        .catch(() => {
          outputDiv.innerHTML = `<p>⚠️ Failed to load weather data.</p>`;
        });
    }
