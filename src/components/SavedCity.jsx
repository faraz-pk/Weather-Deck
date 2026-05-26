import React from "react";
import { useSelector } from "react-redux";

const SavedCity = ({ city, temp, subtitle, onClick }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[10px] md:text-xs lg:text-sm font-bold rounded-lg px-3 py-2 my-1 w-full flex justify-between items-center cursor-pointer hover:outline ${
        theme === "dark" ? "dark-bg" : "light-bg"
      }`}
    >
      <span className="text-left">
        <span className="block">{city}</span>
        {subtitle ? (
          <span className="block grey-text text-[11px]">{subtitle}</span>
        ) : null}
      </span>
      <span>{temp}</span>
    </button>
  );
};

export default SavedCity;
