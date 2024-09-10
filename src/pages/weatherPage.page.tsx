// src/WeatherApp.js
import { useState, useEffect, useTransition } from "react";
import axios from "axios";
import { WeatherDataProps } from "@utils/types";
import WeatherSearchForm from "@components/weatherSearchForm";
import Weather from "@components/weather";
import RecentWeatherResearched from "@components/recentWeatherResearchedList";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherDataProps | null>(null);
  const [error, setError] = useState<string>("");
  const recentData = localStorage.getItem("recentSearches");
  const [isPending, startTransition] = useTransition();
  const [recentSearches, setRecentSearches] = useState<string[]>(
    recentData ? JSON.parse(recentData) : []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const API_KEY = "f00c38e0279b7bc85480c3fe775d518c";

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);

      addRecentSearch(cityName);
    } catch (err) {
      setError("City not found");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addRecentSearch = (cityName: string) => {
    const updatedSearches = [
      cityName,
      ...recentSearches.filter((item) => item !== cityName),
    ].slice(0, 3);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      startTransition(() => {
        fetchWeather(city);
      });
    } else {
      setError("Please enter a valid city");
    }
  };

  const handleRecentSearchClick = (cityName: string) => {
    startTransition(() => {
      setCity(cityName);
    });
    fetchWeather(cityName);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      });
    }
  }, []);

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Unable to fetch weather for your location");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">
        Weather App
      </h1>
      <WeatherSearchForm
        city={city}
        setCity={setCity}
        handleSubmit={handleSubmit}
      />
      {loading ||
        (isPending && <p className="text-center text-blue-500">Loading...</p>)}
      {error && <p className="text-center text-red-500">{error}</p>}
      {weather && <Weather weather={weather} />}
      {recentSearches.length > 0 && (
        <RecentWeatherResearched
          recentSearches={recentSearches}
          handleRecentSearchClick={handleRecentSearchClick}
        />
      )}
    </section>
  );
};

export default WeatherApp;
