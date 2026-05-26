import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./features/weatherSlice";

function App() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(getWeather("Islamabad"));
  }, [dispatch]);

 useEffect(() => {
  document.body.style.backgroundColor =
    theme === "dark" ? "#0f1728" : "#c1c5ca4d";
  document.body.style.color =
    theme === "dark" ? "#fff" : "#000";
}, [theme]);


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center text-4xl h-screen">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 p-4">
        <div className="text-lg font-semibold">Failed to load weather</div>
        <div className="text-sm grey-text">{error || "Unknown error"}</div>
        <button
          className="mt-2 px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => dispatch(getWeather("Islamabad"))}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center text-4xl h-screen">
        No data
      </div>
    );
  }

  return (
    <div className="w-full sm:flex sm:gap-3 p-2.75">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
