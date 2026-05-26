import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCitySuggestions } from "./cityAPI";

export const getCitySuggestions = createAsyncThunk(
  "city/getSuggestions",
  async (query) => {
    return await fetchCitySuggestions(query);
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    suggestions: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCitySuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCitySuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(getCitySuggestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default citySlice.reducer;