import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../../services/appwrite/auth';

const authService = new AuthService();

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const result = await authService.login(credentials);
    if (!result.success) {
      throw new Error(result.error?.message || 'Login failed');
    }
    return result.session;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; name: string }) => {
    const result = await authService.register(credentials);
    if (!result.success) {
      throw new Error(result.error?.message || 'Registration failed');
    }
    return result.user;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const result = await authService.logout();
  if (!result.success) {
    throw new Error(result.error?.message || 'Logout failed');
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  const result = await authService.getCurrentUser();
  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to get current user');
  }
  return result.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;