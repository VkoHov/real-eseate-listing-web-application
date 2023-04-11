import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { api, RegisterData } from './auth.api';

export const enum UserRole {
  USER = 'user',
  AGENT = 'agent',
}
interface UserData {
  role: UserRole | null;
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
    role: null,
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
  reducers: {
    restoreUserDataFromLS: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload.user;
      state.loading = false;
      state.userData = {
        ...state.userData,
        role: user.role,
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Login failed';
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      const user = action.payload.user;

      state.loading = false;
      state.userData = {
        ...state.userData,
        role: user.role,
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Sign up failed';
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.userData = {
        role: null,
        id: null,
        name: null,
        email: null,
      };
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Logout failed';
    });
  },
});

export const selectAuth = (state: RootState) => state.authReducer.userData;
export const { restoreUserDataFromLS } = authSlice.actions;

export default authSlice.reducer;
