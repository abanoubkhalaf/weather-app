import { FC } from "react";
import { WeatherSearchFormProps } from "../utils/types";

const WeatherSearchForm: FC<WeatherSearchFormProps> = ({
  city,
  setCity,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="w-3/4 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-500"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button
        type="submit"
        className="p-3 text-white transition bg-blue-500 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
        disabled={city.trim().length === 0}
      >
        Get Weather
      </button>
    </form>
  );
};

export default WeatherSearchForm;
