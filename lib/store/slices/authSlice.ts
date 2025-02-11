import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
  twoFactorSecret: string | null;
  twoFactorVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  twoFactorSecret: null,
  twoFactorVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setTwoFactorSecret: (state, action: PayloadAction<string>) => {
      state.twoFactorSecret = action.payload;
    },
    setTwoFactorVerified: (state, action: PayloadAction<boolean>) => {
      state.twoFactorVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.twoFactorSecret = null;
      state.twoFactorVerified = false;
    },
  },
});

export const { setUser, setTwoFactorSecret, setTwoFactorVerified, logout } = authSlice.actions;
export default authSlice.reducer;