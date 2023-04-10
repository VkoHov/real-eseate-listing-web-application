import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, RegisterData } from './auth.api';

interface UserData {
  type: 'user' | 'agent' | null;
  id: number | null;
  name: string | null;
  email: string | null;
}

interface AuthState {
  userData: UserData;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userData: {
    type: null,
    id: null,
    name: null,
    email: null,
  },
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.login(credentials);
    return response.data;
  },
);

export const signUp = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData) => {
    const response = await api.register(userData);
    return response.data;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.logout();
  return;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      const user = action.payload.user;
      state.loading = false;
      state.userData = {
        ...state.userData,
        type: user.type,
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = {
        ...state.userData,
        type: 'user',
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.userData = {
        type: null,
        id: null,
        name: null,
        email: null,
      };
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
  },
});

export default authSlice.reducer;