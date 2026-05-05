import React from "react";
import { useRef } from "react";
import HourlyForecastBox from "./HourlyForecastBox";
import { useSelector } from "react-redux";

const HourlyForecastBar = () => {
  const sliderRef = useRef(null);
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

  const currentTime = data?.location.localtime;
  const currentHour = new Date(currentTime).getHours();
  const todayHours = data?.forecast.forecastday[0].hour;
  const tomorrowHours = data?.forecast.forecastday[1].hour;
  const remainingToday = todayHours.slice(currentHour + 1);
  const next12Hours = [...remainingToday, ...tomorrowHours].slice(0, 12);

  const getColor = (index) => {
    if(index <= 0) {
      return "purple"
    } else if(index > 0 && index <= 10) {
      return "#2a3ef2"
    } else if(index > 10 && index <= 20) {
      return "#59bef5"
    } else if(index > 20 && index <= 30) {
      return "#dace47"
    } else if(index > 30 && index <= 45) {
      return "#ff9742"
    } else if(index > 45) {
      return "#FF6467"
    }
  }

  return (
    <div className="mt-2.5">
      <p className="grey-text text-sm font-medium mb-2">Hourly Forecast</p>
      <div className="relative flex items-center">
        <div className="md:hidden absolute left-0 top-0 z-10 h-full w-10 pointer-events-none bg-linear-to-r from-[#0b1220] to-transparent"></div>

        <div className="md:hidden absolute right-0 top-0 z-10 h-full w-10 pointer-events-none bg-linear-to-l from-[#0b1220] to-transparent"></div>
        <button
          className="md:hidden absolute left-1 z-10 w-8 h-8 rounded-full bg-white/10 text-white"
          onClick={scrollLeft}
        >
          &#10094;
        </button>
        <div
          className="overflow-x-auto scroll-smooth scrollbar-hide w-full md:overflow-visible"
          ref={sliderRef}
        >
          <div className="md:grid md:grid-cols-12 flex gap-1 min-w-max md:min-w-0">
            {next12Hours.map((hour) => (
              <HourlyForecastBox
                key={hour.time}
                time={(hour.time).split(" ")[1]}
                temp={hour.temp_c + "°C"}
                color={getColor(hour.temp_c)}
                icon={hour.condition.icon}
              />
            ))}
          </div>
        </div>
        <button
          className="md:hidden absolute right-1 z-10 w-8 h-8 rounded-full bg-white/10 text-white"
          onClick={scrollRight}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default HourlyForecastBar;
