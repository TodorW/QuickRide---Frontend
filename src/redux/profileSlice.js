// profileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: { /* initial state */ },
  reducers: {
    updateProfile: (state, action) => {
      // your logic for updating profile
    },
    setSelectedUser: (state, action) => {
      // another reducer
    }
  },
});

export const { updateProfile, setSelectedUser } = profileSlice.actions; // Ensure updateProfile is exported here

export default profileSlice.reducer;
