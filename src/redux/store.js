import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import reservationReducer from "./reservationSlice";
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    reservation: reservationReducer,
  },
});
