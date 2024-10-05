import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCar: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
  },
});

export const { setSelectedCar } = carSlice.actions;
export default carSlice.reducer;
