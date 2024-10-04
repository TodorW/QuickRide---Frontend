import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: null,
  name: "",
  email: "",
  phone: "",
  address: "",
  birthDate: "",
  gender: "",
  bio: "",
  privacy: "public",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
