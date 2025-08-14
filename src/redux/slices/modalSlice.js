import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dayModalOpen: false,
  payload: null
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDayModal: (state, action) => {
      state.payload = action.payload;
      state.dayModalOpen = true;
    },
    closeDayModal: (state) => {
      state.dayModalOpen = false;
      state.payload = null;
    },
  }
});

export const { openDayModal, closeDayModal } = modalSlice.actions

export default modalSlice.reducer