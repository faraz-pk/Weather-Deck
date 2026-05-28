import React from "react";
import WeatherInfoItem from "./WeatherInfoItem";
import HourlyForecastBar from "./HourlyForecastBar";
import WeeklyForecastBar from "./WeeklyForecastBar";
import TempTrendGraph from "./TempTrendGraph";
import AirQualitySection from "./AirQualitySection";
import { useSelector } from "react-redux";
import { LuWind } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { BsCloudFog2 } from "react-icons/bs";
import { MdOutlineWaterDrop } from "react-icons/md";

const MainContent = () => {
  const { data } = useSelector((state) => state.weather);
  if (!data) return null;

  const getUVInfo = (index) => {
    if (index >= 0 && index <= 2) {
      return { label: "Low", color: "#05DF72" };
    } else if (index > 2 && index <= 5) {
      return { label: "Moderate", color: "#dace47" };
    } else if (index > 5 && index <= 8) {
      return { label: "High", color: "#ff9742" };
    } else if (index > 8) {
      return { label: "Very High", color: "#FF6467" };
    }
  };

  const getHumidityInfo = (index) => {
    if (index >= 0 && index <= 30) {
      return { label: "Dry", color: "#dace47" };
    } else if (index >= 31 && index <= 60) {
      return { label: "Comfortable", color: "#05DF72" };
    } else if (index >= 61 && index <= 80) {
      return { label: "Humid", color: "#ff9742" };
    } else if (index >= 81) {
      return { label: "Very Humid", color: "#FF6467" };
    }
  };

  const getHeatInfo = (index) => {
    if (index >= 0 && index < 27) {
      return { label: "Comfortable", color: "#05DF72" };
    } else if (index >= 27 && index <= 32) {
      return { label: "Caution", color: "#dace47" };
    } else if (index >= 33 && index <= 41) {
      return { label: "High Caution", color: "#ff9742" };
    } else if (index >= 42 && index <= 54) {
      return { label: "Danger", color: "#FF6467" };
    } else if (index > 54) {
      return { label: "Extreme Danger", color: "#e638e6" };
    }
  };

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

  const uvInfo = getUVInfo(data?.current?.uv) ?? { label: "", color: "gray" };
  const aqiInfo = getAQIInfo(data?.current?.air_quality?.["us-epa-index"]) ?? {
    label: "",
    color: "gray",
  };
  const humidityInfo = getHumidityInfo(data?.current?.humidity) ?? {
    label: "",
    color: "gray",
  };
  const heatInfo = getHeatInfo(data?.current?.heatindex_c) ?? {
    label: "",
    color: "gray",
  };

  return (
    <div className="mt-3.5 sm:w-4/5">
      <div className="grid grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-3">
        <WeatherInfoItem
          color="#4a98d3"
          title="Wind Speed"
          value={data?.current.wind_kph + " km/h"}
          symbol={data?.current.wind_dir}
          Icon={LuWind}
        />
        <WeatherInfoItem
          color={uvInfo.color}
          title="UV Index"
          value={data?.current.uv + " - " + uvInfo.label}
          symbol="-"
          Icon={LuSun}
        />
        <WeatherInfoItem
          color={aqiInfo.color}
          title="AQI"
          value={
            data?.current.air_quality["us-epa-index"] + " - " + aqiInfo.label
          }
          symbol="-"
          Icon={BsCloudFog2}
        />
        <WeatherInfoItem
          color={humidityInfo.color}
          title="Humidity"
          value={Math.floor(data?.current.humidity) + " - " + humidityInfo.label}
          symbol="%"
          Icon={MdOutlineWaterDrop}
        />
        <WeatherInfoItem
          color={heatInfo.color}
          title="Heat Index"
          value={Math.floor(data?.current.heatindex_c) + " - " + heatInfo.label}
          symbol="C"
          Icon={MdOutlineWaterDrop}
        />
        <WeatherInfoItem
          color="#4a98d3"
          title="Dew Point"
          value={data?.current.dewpoint_c}
          symbol="C"
          Icon={MdOutlineWaterDrop}
        />
      </div>
      <div>
        <HourlyForecastBar />
      </div>
      <div className="xs:flex">
        <div className="xs:w-[70%] mt-2.5">
          <WeeklyForecastBar />
          <TempTrendGraph />
        </div>
        <div className="xs:w-[30%] mt-2.5 ml-2">
          <AirQualitySection />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
