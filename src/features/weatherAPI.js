import axios from "axios";

const API_KEY = "71cb5b1a32ef4fa0a01125347260205";
const BASE_URL = "http://api.weatherapi.com/v1";

export const fetchWeather = async (city) => {
  const response = await axios.get(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes`
  );
  return response.data;
};