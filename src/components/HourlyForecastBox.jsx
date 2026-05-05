import React from "react";
import { useSelector } from "react-redux";

const HourlyForecastBox = (props) => {

  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`border-effect rounded-2xl px-3 py-1.5 lg:px-5 lg:py-3 flex flex-col justify-center items-center text-xs lg:text-sm ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
      <span className="grey-text">{props.time}</span>
      <span><img className="w-6" src={props.icon} alt="icon" /></span>
      <span style={{ color: props.color }}>{props.temp}</span>
    </div>
  );
};

export default HourlyForecastBox;