import React, { useEffect, useState } from "react";
import SavedCity from "./SavedCity";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../features/weatherSlice";
import { getSavedCities, subscribeToSavedCities } from "../utils/savedCities";

const SavedLocs = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    setSavedCities(getSavedCities());
    return subscribeToSavedCities(setSavedCities);
  }, []);

  return (
    <div
      className={`card w-full rounded-xl p-2.5 grow ${
        theme === "dark" ? "dark-gradient" : "white-bg"
      }`}
    >
      <div className="font-bold ml-1 text-md md:text-lg">Saved Locations</div>
      <div className="scroll-bar pr-2 h-69">
        {savedCities.length > 0 ? (
          savedCities.map((city) => (
            <SavedCity
              key={city.name}
              city={city.name}
              temp={`${city.temp}°C`}
              subtitle={city.country}
              onClick={() => dispatch(getWeather(city.name))}
            />
          ))
        ) : (
          <div className="text-xs lg:text-sm px-3 py-2 grey-text">
            No saved locations yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedLocs;
