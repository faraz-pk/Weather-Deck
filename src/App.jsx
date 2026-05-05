import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./features/weatherSlice";

function App() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.weather);

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


  if (status === "idle" || status === "loading" || !data) {
    return (
      <div className="flex justify-center items-center text-4xl h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full sm:flex gap-3 p-3">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
