import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import themeReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
     theme: themeReducer,
  },
});