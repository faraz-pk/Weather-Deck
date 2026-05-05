import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        checked={theme === "light"}
        onChange={() => dispatch(toggleTheme())}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />

      <div className={`w-full h-full border-effect rounded-full flex items-center justify-between px-1 text-xs ${
          theme === "dark" ? "dark-gradient grey-border" : "white-bg black-border"
        }`}>
        <FaMoon />
        <IoIosSunny />
      </div>

      {/* KNOB */}
      <span
        className={`absolute top-1 left-1 h-4 w-4 grey-border grey-bg rounded-full transition-transform duration-300 ${
          theme === "light" ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </div>
  );
};

export default ThemeToggleButton;