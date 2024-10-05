import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelectedUser, updateUser } = profileSlice.actions;

export default profileSlice.reducer;
