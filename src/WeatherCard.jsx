import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherCard.css"; // We'll use this for styling

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [localTime, setLocalTime] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  const updateLocalTime = (offsetSeconds) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const local = new Date(utc + offsetSeconds * 1000);
    const formatted = local.toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    setLocalTime(formatted);
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    axios.get(url)
      .then((res) => {
        setWeather(res.data);
        updateLocalTime(res.data.timezone);

        const interval = setInterval(() => {
          updateLocalTime(res.data.timezone);
        }, 1000);

        return () => clearInterval(interval);
      })
      .catch(() => setError(`⚠️ Couldn't fetch weather for ${city}`));
  }, [city]);

  const getWeatherEmoji = (main) => {
    switch (main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Drizzle": return "🌦️";
      case "Thunderstorm": return "⛈️";
      case "Snow": return "❄️";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog": return "🌫️";
      default: return "🌡️";
    }
  };

  return (
    <div className="weather-card">
      {error && <p className="error">{error}</p>}

      {weather ? (
        <>
          <div className="city-header">
            <span className="emoji">{getWeatherEmoji(weather.weather[0].main)}</span>
            <h2>{weather.name}</h2>
          </div>

          <p className="time">{localTime}</p>
          <p className="temp">{weather.main.temp}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
        </>
      ) : (
        !error && <p className="loading">⏳ Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
