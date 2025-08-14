import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dayDetailOpen: false,
  payload: null
}

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    openDayDetail: (state, action) => {
      state.payload = action.payload;
      state.dayDetailOpen = true;
    },
    closeDayDetail: (state) => {
      state.dayDetailOpen = false;
      state.payload = null;
    },
  }
});

export const { openDayDetail, closeDayDetail } = daySlice.actions

export default daySlice.reducer