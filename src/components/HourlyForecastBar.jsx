import React, { useEffect, useRef, useState } from "react";
import HourlyForecastBox from "./HourlyForecastBox";
import { useSelector } from "react-redux";

const HourlyForecastBar = () => {
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

  const currentTime = data.location.localtime;
  const currentHour = new Date(currentTime).getHours();
  const todayHours = data.forecast.forecastday[0].hour;
  const tomorrowHours = data.forecast.forecastday[1].hour;
  const remainingToday = todayHours.slice(currentHour + 1);
  const next12Hours = [...remainingToday, ...tomorrowHours].slice(0, 12);

  const getColor = (index) => {
    if (index <= 0) {
      return "purple";
    }
    if (index <= 10) {
      return "#2a3ef2";
    }
    if (index <= 20) {
      return "#59bef5";
    }
    if (index <= 30) {
      return "#dace47";
    }
    if (index <= 45) {
      return "#ff9742";
    }
    return "#FF6467";
  };

  const arrowThemeClass =
    theme === "dark"
      ? "text-white bg-slate-900/35 border border-white/10 shadow-[0_10px_24px_rgba(15,23,42,0.32)]"
      : "text-slate-700 bg-white/80 border border-slate-200/80 shadow-[0_10px_24px_rgba(148,163,184,0.26)] backdrop-blur-sm";

  const fadeThemeClass =
    theme === "dark" ? "forecast-fade-dark" : "forecast-fade-light";

  return (
    <div className="mt-2.5">
      <p className="text-sm font-medium mb-2">Hourly Forecast</p>
      <div className="relative flex items-center">
        {canScrollLeft ? (
          <div
            className={`md:hidden absolute left-0 top-0 z-10 h-full w-12 pointer-events-none forecast-fade-left ${fadeThemeClass}`}
          />
        ) : null}
        {canScrollRight ? (
          <div
            className={`md:hidden absolute right-0 top-0 z-10 h-full w-12 pointer-events-none forecast-fade-right ${fadeThemeClass}`}
          />
        ) : null}
        {canScrollLeft ? (
          <button
            className={`md:hidden absolute left-1 z-20 w-8 h-8 rounded-full ${arrowThemeClass}`}
            onClick={scrollLeft}
          >
            &#10094;
          </button>
        ) : null}
        <div
          className="overflow-x-auto scroll-smooth w-full md:overflow-visible"
          ref={sliderRef}
        >
          <div className="md:grid md:grid-cols-12 flex gap-1">
            {next12Hours.map((hour) => (
              <HourlyForecastBox
                key={hour.time}
                time={hour.time.split(" ")[1]}
                temp={`${hour.temp_c}°C`}
                color={getColor(hour.temp_c)}
                icon={hour.condition.icon}
              />
            ))}
          </div>
        </div>
        {canScrollRight ? (
          <button
            className={`md:hidden absolute right-1 z-20 w-8 h-8 rounded-full ${arrowThemeClass}`}
            onClick={scrollRight}
          >
            &#10095;
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HourlyForecastBar;
