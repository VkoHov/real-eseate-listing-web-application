// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, logoutAPI } from '../api/auth';

type UserData = {
  type: 'user' | 'agent' | null;
  id: number | null;
  name: string | null;
  token: string | null;
  email: string | null;
};

type AuthState = {
  userData: UserData;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  userData: {
    type: null,
    id: null,
    name: null,
    token: null,
    email: null,
  },
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const userData = await loginAPI(email, password);
      return userData;
    } catch (error) {
      throw error;
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const userData = await registerAPI(email, password, name);
      return userData;
    } catch (error) {
      throw error;
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (token: string) => {
  try {
    await logoutAPI(token);
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userData = {
          type: null,
          id: null,
          name: null,
          token: null,
          email: null,
        };
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default authSlice.reducer;
