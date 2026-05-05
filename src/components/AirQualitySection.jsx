import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AirQualitySection = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { data } = useSelector((state) => state.weather);
  if (!data) return null;

  const [currentTime, setCurrentTime] = useState(
    new Date(data?.location?.localtime).getTime(),
  );

  useEffect(() => {
    // update immediately (in case component loads late)
    setCurrentTime(new Date(data?.location?.localtime).getTime());

    const interval = setInterval(() => {
      // increment by 1 minute instead of recalculating from API
      setCurrentTime((prev) => prev + 60000);
    }, 60000);

    return () => clearInterval(interval);
  }, [data]);

  const sunrise = convertToTodayTime(
    data?.forecast.forecastday[0].astro.sunrise,
  );
  const sunset = convertToTodayTime(data?.forecast.forecastday[0].astro.sunset);
  const now = currentTime;

  let progress = (now - sunrise) / (sunset - sunrise);

  // clamp between 0 and 1
  progress = Math.max(0, Math.min(1, progress));

  const centerX = 100;
  const centerY = 90;
  const radius = 80;
  const angle = Math.PI * (1 - progress);
  const dotX = centerX + radius * Math.cos(angle);
  const dotY = centerY - radius * Math.sin(angle);

  const getAQIInfo = (index) => {
    switch (index) {
      case 1:
        return { label: "Good", color: "#05DF72" };
      case 2:
        return { label: "Moderate", color: "#dace47" };
      case 3:
        return { label: "Sensitive", color: "#ff9742" };
      case 4:
        return { label: "Unhealthy", color: "#FF6467" };
      case 5:
        return { label: "Very Unhealthy", color: "#e638e6" };
      case 6:
        return { label: "Hazardous", color: "maroon" };
      default:
        return { label: "Unknown", color: "gray" };
    }
  };

  function convertToTodayTime(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.getTime();
  }

  const aqiInfo = getAQIInfo(data?.current?.air_quality?.["us-epa-index"]) ?? {
    label: "",
    color: "gray",
  };

  const percent =
    (data?.current?.air_quality?.["us-epa-index"] / 6) * 100 + "%";

  return (
    <div className={`h-full card rounded-2xl py-2 px-3 ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
      <p className="text-sm grey-text font-medium mb-1 lg:mb-0.5">
        Air Quality
      </p>
      <div className="grey-border-bottom pb-1 lg:pb-0.5">
        <p
          className="text-xl md:text-2xl font-bold"
          style={{ color: aqiInfo.color }}
        >
          {aqiInfo.label}
        </p>
        <p className="text-[10px] md:text-xs grey-text font-medium">
          AQI {data?.current?.air_quality?.["us-epa-index"]} · PM2.5{" "}
          {data?.current?.air_quality?.pm2_5} · PM10{" "}
          {data?.current?.air_quality?.pm10}
        </p>
        <div className="w-full h-2 grey-bg rounded-md overflow-hidden relative my-3 lg:my-2">
          <div
            className={"h-full rounded-md"}
            style={{ background: aqiInfo.color, width: percent }}
          ></div>
        </div>
        <p className="text-[10px] md:text-xs grey-text font-medium">
          NO2 {data?.current?.air_quality?.no2} · CO{" "}
          {data?.current?.air_quality?.co} · O3 {data?.current?.air_quality?.o3}{" "}
          · SO2 {data?.current?.air_quality?.so2}
        </p>
      </div>
      <div>
        <p className="text-sm grey-text font-medium my-2 lg:my-1">
          Sun Tracker
        </p>
        <div className="sun-arc-wrap">
          <svg
            viewBox="0 0 200 100"
            className="sun-arc-svg"
            aria-label="Sun tracker arc"
          >
            <path
              d="M20 90 A80 80 0 0 1 180 90"
              className="sun-arc-track"
              fill="none"
            />
            <path
              d="M20 90 A80 80 0 0 1 180 90"
              className="sun-arc-progress"
              fill="none"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress * 100}
            />
            <circle cx={dotX} cy={dotY} r="8" className="sun-dot" />
          </svg>
        </div>
      </div>
      <div className="text-[#facc15] text-sm my-1.5 lg:my-1 flex justify-between">
        <span>Rise {data?.forecast.forecastday[0].astro.sunrise}</span>
        <span>Set {data?.forecast.forecastday[0].astro.sunset}</span>
      </div>
    </div>
  );
};

export default AirQualitySection;
