import React, { useState } from 'react';
import './App.css';

const API_KEY = "428e733620644ad2a23102327251305"; // replace with your OpenWeatherMap API key

function App() {
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [error, setError] = useState("");

const getWeather = async () => {
if (!city) return;

try {
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await response.json();
if (data.cod !== 200) {
setError(data.message);
setWeather(null);
} else {
setWeather(data);
setError("");
}
} catch (err) {
setError("Failed to fetch weather");
setWeather(null);
}
};

return (
<div className="App">
<h1>🌦️ Weather App</h1>
<input
type="text"
placeholder="Enter city name"
value={city}
onChange={(e) => setCity(e.target.value)}
/>
<button onClick={getWeather}>Get Weather</button>

{error && <p style={{ color: "red" }}>{error}</p>}

{weather && (
<div>
<h2>{weather.name}, {weather.sys.country}</h2>
<p>{weather.weather[0].description}</p>
<p>🌡️ {weather.main.temp} °C</p>
<img
alt="weather icon"
src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
/>
</div>
)}
</div>
);
}

export default App;