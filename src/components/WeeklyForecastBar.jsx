import React from "react";
import WeeklyForecastItem from "./WeeklyForecastItem";
import { useSelector } from "react-redux";

const WeeklyForecastBar = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { data } = useSelector((state) => state.weather);

  if (!data) return null;

  const forecastDays = data.forecast?.forecastday || [];
  if (!forecastDays.length) return null;

  return (
    <div
      className={`card w-full rounded-2xl py-2.5 px-3.75 ${
        theme === "dark" ? "dark-gradient" : "white-bg"
      }`}
    >
      <p className="text-sm font-medium mb-2.5">
        {forecastDays.length} - Day Forecast
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
        {forecastDays.map((i) => {
          const dayName = new Date(i.date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <WeeklyForecastItem
              key={i.date}
              day={dayName}
              temp={`${Math.floor(i.day.mintemp_c)}°C / ${Math.floor(i.day.maxtemp_c)}°C`}
              icon={i.day.condition.icon}
              chance={i.day.daily_chance_of_rain}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecastBar;
