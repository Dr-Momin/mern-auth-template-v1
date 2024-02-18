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

const signOut = createAsyncThunk("user/signOut", async () => {
  try {
    await fetch("/api/auth/signout");
  } catch (error) {
    console.log(error);
  }
});

const updateUser = createAsyncThunk("user/update", async (id, updatedData) => {
  const response = await fetch(`/api/user/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    // signal: thunkAPI.signal,
  });
  const data = await response.json();

  if (!data) return null;

  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      state.error = action.error.message;
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
      state.error = action.error.message;
    });

    builder.addCase(signOut.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = "";
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.data;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const userReducer = (state) => state.user;
export { signInUser, signInWithGoogle, signOut, updateUser };

export default userSlice.reducer;
