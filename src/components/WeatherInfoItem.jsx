import React from "react";
import { useSelector } from "react-redux";

const WeatherInfoItem = (props) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`card rounded-2xl px-3.5 py-2.25 md:px-3.75 md:py-2.5 ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}
    >
      <div
        className="flex justify-between items-center text-lg"
        style={{ color: props.color }}
      >
        <span>
          <props.Icon />
        </span>
        <span>{props.symbol}</span>
      </div>
      <div className="mt-3 md:mt-3.75" style={{ color: props.color }}>
        <p className="text-xs xl:text-md grey-text">{props.title}</p>
        <p className="text-sm xl:text-[16px]">{props.value}</p>
      </div>
    </div>
  );
};

export default WeatherInfoItem;
