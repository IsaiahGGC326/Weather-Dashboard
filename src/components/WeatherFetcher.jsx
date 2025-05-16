import { useState } from 'react';

function WeatherFetcher() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌤 Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && weather.main && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °F</p>
          <p>💨 Wind: {weather.wind.speed} mph</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherFetcher;
