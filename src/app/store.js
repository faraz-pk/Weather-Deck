import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import themeReducer from "../features/themeSlice";
import cityReducer from "../features/citySlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
     theme: themeReducer,
     city: cityReducer,
  },
});