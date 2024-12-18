import React, { useState} from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const fetchForecast = async () => {
    try{
      setError(null);
      const API_KEY = "yourapikey";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecast(response.data);
    } catch(err) {
      setForecast(null);
      setError("City not found. Please try again.")
    }
  };


  return(
    <div className="app">
      <header className="header">
        <h1>5-Day Weather Forecast</h1>
        <div className="search-box">
          <input 
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchForecast}>Search</button>
        </div>
      </header>

      {forecast && (
        <div className="forecast-container">
          {forecast.list.filter((_, index) => index % 8 === 0)
          .map((item, index) => (
            <div key={index} className="forecast-card">
              <p className="date">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <img 
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <p className="description">{item.weather[0].description}</p>
              <p className="temp">{Math.round(item.main.temp)}C</p>
              <div className="details">
                <p>Humidity: {item.main.humidity}</p>
                <p>Wind: {item.wind.speed}</p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default App;