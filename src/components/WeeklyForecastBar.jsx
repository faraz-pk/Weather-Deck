import React, { useEffect, useRef, useState } from "react";
import WeeklyForecastItem from "./WeeklyForecastItem";
import { useSelector } from "react-redux";

const WeeklyForecastBar = () => {
  const sliderRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);
  const { data } = useSelector((state) => state.weather);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return undefined;

    const syncScrollState = () => {
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      setCanScrollLeft(slider.scrollLeft > 4);
      setCanScrollRight(slider.scrollLeft < maxScrollLeft - 4);
    };

    syncScrollState();
    slider.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      slider.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [data]);

  if (!data) return null;

  const forecastDays = data.forecast?.forecastday || [];
  if (!forecastDays.length) return null;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  const arrowThemeClass =
    theme === "dark"
      ? "text-white bg-slate-900/35 border border-white/10 shadow-[0_10px_24px_rgba(15,23,42,0.32)]"
      : "text-slate-700 bg-white/80 border border-slate-200/80 shadow-[0_10px_24px_rgba(148,163,184,0.26)] backdrop-blur-sm";

  const fadeThemeClass =
    theme === "dark" ? "forecast-fade-dark" : "forecast-fade-light";

  return (
    <div
      className={`card w-full rounded-2xl py-2.5 px-3.75 ${
        theme === "dark" ? "dark-gradient" : "white-bg"
      }`}
    >
      <p className="text-sm font-medium mb-2.5">
        {forecastDays.length} - Day Forecast
      </p>
      <div className="relative flex items-center overflow-hidden">
        {canScrollLeft ? (
          <div
            className={`lg:hidden absolute left-0 top-0 z-10 h-full w-14 pointer-events-none forecast-fade-left ${fadeThemeClass}`}
          />
        ) : null}
        {canScrollRight ? (
          <div
            className={`lg:hidden absolute right-0 top-0 z-10 h-full w-14 pointer-events-none forecast-fade-right ${fadeThemeClass}`}
          />
        ) : null}
        {canScrollLeft ? (
          <button
            className={`lg:hidden absolute left-1 z-20 w-8 h-8 rounded-full ${arrowThemeClass}`}
            onClick={scrollLeft}
          >
            &#10094;
          </button>
        ) : null}

        <div
          className="overflow-x-auto scroll-smooth scrollbar-hide w-full lg:overflow-visible"
          ref={sliderRef}
        >
          <div className="flex gap-1 min-w-max lg:min-w-0">
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
        {canScrollRight ? (
          <button
            className={`lg:hidden absolute right-1 z-20 w-8 h-8 rounded-full ${arrowThemeClass}`}
            onClick={scrollRight}
          >
            &#10095;
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default WeeklyForecastBar;
