import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ id: string; email: string; name: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    signupSuccess: (
      state,
      action: PayloadAction<{ id: string; email: string; name: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  signupSuccess,
  logout,
  setError,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
