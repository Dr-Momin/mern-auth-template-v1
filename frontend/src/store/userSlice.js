import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: "idle",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = "idle";
    },
    signInSuccess: (state, action) => {
      state.loading = "success";
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export const userReducer = (state) => state.user;

export default userSlice.reducer;
