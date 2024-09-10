import { FC } from "react";
import { WeatherProps } from "../utils/types";

const Weather: FC<WeatherProps> = ({ weather }) => {
  return (
    <article className="text-center">
      <h2 className="mb-2 text-2xl font-semibold">{weather.name}</h2>
      <p className="text-lg">Temperature: {weather.main.temp}°C</p>
      <p className="text-lg capitalize">{weather.weather[0].description}</p>
      <p className="text-lg">Humidity: {weather.main.humidity}%</p>
      <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto my-4"
      />
    </article>
  );
};

export default Weather;
