import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { getCitySuggestions } from "../features/citySlice";
import { getWeather } from "../features/weatherSlice";

const SearchBar = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.city);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(getCitySuggestions(value));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setShowSuggestions(true);
      debouncedSearch(value);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    dispatch(getWeather(trimmedQuery));
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectCity = (cityObj) => {
    const name = cityObj.name || "";
    if (!name) return;
    setQuery(name);
    dispatch(getWeather(name));
    setShowSuggestions(false);
  };

  const clear = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative z-1000 w-3/4 border-effect sm:w-1/2 flex items-center justify-center rounded-3xl ${
        theme === "dark" ? "dark-gradient grey-border" : "white-bg black-border"
      }`}
    >
      <span
        className={`grey-text ml-5 cursor-pointer transition-colors ${
          theme === "dark"
            ? "[&_svg]:hover:text-white"
            : "[&_svg]:hover:text-black"
        }`}
        onClick={handleSubmit}
      >
        <FaSearch />
      </span>
      <input
        placeholder="Search City"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        autoComplete="off"
        name="city"
        id="city"
        className="w-full py-1.75 px-3.75 outline-none border-none"
      />
      <span
        className={`grey-text text-lg mr-5 cursor-pointer transition-colors ${
          theme === "dark"
            ? "[&_svg]:hover:text-white"
            : "[&_svg]:hover:text-black"
        }`}
        onClick={clear}
      >
        <RxCrossCircled />
      </span>
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`w-full top-10 z-2000 absolute grey-border m-0 p-0 max-h-52 ${
            theme === "dark"
              ? "dark-gradient grey-border"
              : "white-bg black-border"
          }`}
        >
          <ul className="list-none">
            {suggestions.map((city, idx) => (
              <li
                className={`p-2.5 cursor-pointer w-full ${
                  theme === "dark" ? "hover:bg-[#0f1728]" : "hover:bg-[#f0f0f0]"
                }`}
                key={`${city.name}-${city.country}-${idx}`}
                onClick={() => handleSelectCity(city)}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
