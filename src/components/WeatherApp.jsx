import React, { useState } from "react";
import "./WeatherApp.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "936235a3ac6d8a47753d7ebee5d320e6";

  const fetchWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData({
      temp: Math.floor(data.main.temp - 273.15),
      main: data.weather[0].main,
      icon: data.weather[0].icon,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Your Location"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          style={{ marginBottom: "1rem" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Get Weather
        </Button>
      </form>
      {weatherData && (
        <div className="weather">
          <h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
            />{" "}
            {weatherData.temp}°C{" "}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
            />
          </h2>
          <small>{weatherData.main}</small>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
