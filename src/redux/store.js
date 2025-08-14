import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from "@/redux/slices/weatherSlice"
import modalSlice from "@/redux/slices/modalSlice"

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    modal: modalSlice,
  }
})
