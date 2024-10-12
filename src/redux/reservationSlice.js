import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  car: null,
  user: null,
  startDate: null,
  endDate: null,
  totalPrice: 0,
  reservedDates: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservationData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setReservationData } = reservationSlice.actions;
export default reservationSlice.reducer;
