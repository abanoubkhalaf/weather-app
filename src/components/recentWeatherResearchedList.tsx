import { FC } from "react";
import { RecentWeatherResearchedProps } from "../utils/types";

const RecentWeatherResearched: FC<RecentWeatherResearchedProps> = ({
  recentSearches,
  handleRecentSearchClick,
}) => {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">Recent Searches</h3>
      <ul className="flex flex-col items-start justify-start ">
        {recentSearches.map((search, index) => (
          <li key={index}>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleRecentSearchClick(search)}
            >
              {search}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentWeatherResearched;
