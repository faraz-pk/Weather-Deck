// src/features/cityAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_CITY_API_KEY;

export const fetchCitySuggestions = async (query) => {
  if (!query) return [];
  try {
    const { data } = await axios.get("https://api.api-ninjas.com/v1/city", {
      params: { name: query },
      headers: { "X-Api-Key": API_KEY },
    });

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("City suggestions failed:", err);
    return [];
  }
};