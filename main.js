document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "d7c2ecb20b1a6ebd1306ddb780f7309b";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    if (searchBtn) { // Checks if searchBtn exists
        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });
    } else {
        console.error("Search button element not found.");
    }

    async function checkWeather(city) {
        if (!city) {
            console.error("City is required.");
            return;
        }
        
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();
            
            console.log(data);

            if (data.cod === 200) { // Check if the response was successful
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            } else {
                console.error("City not found:", data.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Optional: Call checkWeather with a default city if desired.
    
});

