import { configureStore } from "@reduxjs/toolkit"; // i use this for the first time, i follow the tutorial
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
