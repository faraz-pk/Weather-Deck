// src/features/weatherAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const fetchWeather = async (city) => {
  if (!city) throw new Error("City is required");
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 7,
        aqi: "yes",
      },
    });
    return data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || "Failed to fetch weather");
  }
};