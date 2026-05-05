import React from "react";
import { useRef } from "react";
import WeeklyForecastItem from "./WeeklyForecastItem";
import { useSelector } from "react-redux";

const WeeklyForecastBar = () => {
  const sliderRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);
  const { data } = useSelector((state) => state.weather);
  if (!data) return null;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className={`card w-full rounded-2xl py-2.5 px-3.75 ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
      <p className="text-sm font-medium mb-2.5">7 - Day Forecast</p>
      <div className="relative flex items-center overflow-hidden">
        <div className="lg:hidden absolute left-0 top-0 z-10 h-full w-10 pointer-events-none bg-linear-to-r from-[#0b1220] to-transparent"></div>

        <div className="lg:hidden absolute right-0 top-0 z-10 h-full w-10 pointer-events-none bg-linear-to-l from-[#0b1220] to-transparent"></div>
        <button
          className="lg:hidden absolute left-1 z-10 w-8 h-8 rounded-full bg-white/10 text-white"
          onClick={scrollLeft}
        >
          &#10094;
        </button>

        <div
          className="overflow-x-auto scroll-smooth scrollbar-hide w-full lg:overflow-visible"
          ref={sliderRef}
        >
          <div className="flex gap-1 min-w-max lg:min-w-0">
            {data.forecast.forecastday.map((i) => {
              const dayName = new Date(i.date).toLocaleDateString("en-US", {
                weekday: "short",
              });

              return (
                <WeeklyForecastItem
                  key={i.date}
                  day={dayName}
                  temp={
                    Math.floor(i.day.mintemp_c) +
                    "°C / " +
                    Math.floor(i.day.maxtemp_c) +
                    "°C"
                  }
                  icon={i.day.condition.icon}
                  chance={i.day.daily_chance_of_rain}
                />
              );
            })}
          </div>
        </div>
        <button
          className="lg:hidden absolute right-1 z-10 w-8 h-8 rounded-full bg-white/10 text-white"
          onClick={scrollRight}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default WeeklyForecastBar;
