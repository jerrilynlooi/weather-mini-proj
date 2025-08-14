import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cities: [
    {
      id: 2158177,
      name: "Melbourne",
      country: "Australia",
      latitude: -37.814,
      longitude: 144.96332,
    }
  ]
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push({
        id: action.payload.id,
        name: action.payload.name,
        country: action.payload.country,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      });
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
    },
  }
});

export const { addCity, removeCity } = weatherSlice.actions

export default weatherSlice.reducer