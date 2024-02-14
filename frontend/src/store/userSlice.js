import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
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

const signInWithGoogle = createAsyncThunk(
  "user/signInGoogle",
  async (formData, thunkAPI) => {
    const response = await fetch("/api/auth/google", {
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
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.data;
      state.error = "";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.name;
    });

    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.data;
      state.error = "";
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.name;
    });
  },
});

export const userReducer = (state) => state.user;
export { signInUser, signInWithGoogle };

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
