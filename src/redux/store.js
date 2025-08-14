import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from "@/redux/slices/weatherSlice"
import daySlice from "@/redux/slices/daySlice"

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    day: daySlice,
  }
})
