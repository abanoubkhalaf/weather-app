export type WeatherDataProps = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export type WeatherSearchFormProps = {
  city: string;
  setCity: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type WeatherProps = {
  weather: WeatherDataProps;
};

export type RecentWeatherResearchedProps = {
  recentSearches: string[];
  handleRecentSearchClick: (cityName: string) => void;
};
