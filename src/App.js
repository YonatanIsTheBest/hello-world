import "./App.css";
import WeatherCard from "./WeatherCard";

function App() {
  return (
    <div className="app">
      <h1 className="title">🌍 City Weather</h1>

      <div className="cards-wrapper">
        <WeatherCard city="New York" />
        <WeatherCard city="Jerusalem" />
        <WeatherCard city="Tel Aviv" />
      </div>
    </div>
  );
}

export default App;
