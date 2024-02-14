import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: "idle",
  error: "",
};

const signInUser = createAsyncThunk(
  "user/signIn",
  async (formData, thunkAPI) => {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      signal: thunkAPI.signal,
    });
    const data = await response.json();

    if (!data) return null;

    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = "success";
      state.currentUser = action.payload.data;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.name;
    });
  },
});

export const userReducer = (state) => state.user;
export { signInUser };
export default userSlice.reducer;
