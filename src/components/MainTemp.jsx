import React from "react";
import { HiOutlineSave } from "react-icons/hi";
import { useSelector } from "react-redux";


const MainTemp = () => {
  const theme = useSelector((state) => state.theme.mode);

  const { data } = useSelector((state) => state.weather);
  if (!data) return null;

  return (
    <div className={`card w-full rounded-xl p-4 lg:p-5 flex flex-col gap-2 md:gap-3 ${
          theme === "dark" ? "dark-gradient" : "white-bg"
        }`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl lg:text-2xl font-bold">{data?.location.name}</span>
          <span className="grey-text text-sm capitalize">{data?.current.condition.text}</span>
        </div>
        <div>
          <span className="text-xl lg:text-2xl hover:text-[#d79c12] cursor-pointer">
            <HiOutlineSave />
          </span>
        </div>
      </div>
      <div className="flex flex-col ">
        <span className="text-5xl lg:text-6xl">
          {data?.current.temp_c}<sup className="text-[26px] lg:text-[30px]">°C</sup>
        </span>
        <span className="flex gap-2 items-center">
          <span className="capitalize">{data?.current.condition.text}</span>
          <img className="w-9" src={data?.current.condition.icon} alt="icon"/>
        </span>
        <span className="grey-text">Feels Like {data?.current.feelslike_c}°C</span>
      </div>
      <div className="hl flex justify-between grey-text text-[10px] md:text-xs lg:text-sm">
        <div className="flex flex-col items-center">
          <span>Visibility</span>
          <span>{data?.current.vis_km}km</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Cloud</span>
          <span>{data?.current.cloud}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Pressure</span>
          <span>{data?.current.pressure_mb}</span>
        </div>
      </div>
    </div>
  );
};

export default MainTemp;