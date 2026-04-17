import { useState } from "react";
import "./DailyWeather.css"
export default function DailyWeather({ weather }) {
  const { daily } = weather;
  const { hourly } = weather
  const [selectedDay, setSelectedDay] = useState(0)
  const now = Math.floor(Date.now() / 1000);
  const baseIndex = selectedDay === 0
    ? hourly.time.findIndex(t => t >= now)
    : selectedDay * 24 + 12;

  const hours = hourly.time.slice(baseIndex - 3, baseIndex + 9);
  const weatherIcons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    61: "🌧️",
    71: "❄️",
    80: "🌧️",
    95: "⛈️",
    99: "⛈️",
  }
  const weatherIconsNight = {
    0: "🌙",
    1: "🌙🗨️",
    2: "🌙☁️",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌕🌧️",
    61: "🌙🌧️",
    71: "🌙❄️",
    80: "🌙🌧️",
    95: "🌙⛈️",
    99: "🌙⛈️",
  }
  const sunrise = daily.sunrise[selectedDay];
  const sunset = daily.sunset[selectedDay];

  return (
    <div className="dailyWeather">
      {daily.time.map((timestamp, i) => {
        const date = new Date(timestamp * 1000);

        const formattedDate = date.toLocaleDateString('ru-RU', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });

        const displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);


        return (
          <div style={{background:`linear-gradient(${daily.weather_code[i]>50?"DodgerBlue,lightblue":daily.weather_code[i]<50&&daily.weather_code[i]>2?"lightyellow, white":"yellow,lightyellow"})`}} key={timestamp} onClick={() => setSelectedDay(i)} className={i === selectedDay ? "SelectedDailyWeatherItem" : "dailyWeatherItem"}>
            <p className="date">{displayDate}</p>

            <p className="weatherIcon">{weatherIcons[daily.weather_code[i]] ?? "🌡️"}</p>
            <div className="temps">
              <p> <span>Макс:</span> {daily.temperature_2m_max[i]}°C</p>
              <p> <span>Мин:</span> {daily.temperature_2m_min[i]}°C</p></div>
          </div>)

      })}
      <div className="selected">
        <table className="selectedTable">
          <tbody>
            <tr><td>Время</td>{hours.map((timestamp, i) => (<td key={timestamp}>{new Date(timestamp * 1000).getHours()}:00</td>))}</tr>
            <tr><td>Небо</td>{hours.map((timestamp, i) => { const isNightHour = timestamp < sunrise || timestamp > sunset; const hourIcons = isNightHour ? weatherIconsNight : weatherIcons; return <td className="currentWeather" key={timestamp}>{hourIcons[hourly.weather_code[baseIndex - 3 + i]] ?? "🌡️"}</td> })}</tr>
            <tr><td>Температура</td>{hours.map((timestamp, i) => (<td key={timestamp}>{hourly.temperature_2m[baseIndex - 3 + i]}°</td>))}</tr>
            <tr><td>Влажность</td>{hours.map((timestamp, i) => (<td key={timestamp}>{hourly.relative_humidity_2m[baseIndex - 3 + i]}%</td>))}</tr>
            <tr><td>Скорость ветра</td>{hours.map((timestamp, i) => (<td key={timestamp}>{hourly.wind_speed_10m[baseIndex - 3 + i]}км/Ч</td>))}</tr>
          </tbody>
        </table>
      </div>
    </div>

  );
}