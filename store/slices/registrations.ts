import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventImage: string;
  registeredAt: string;
}

interface RegistrationsState {
  userRegistrations: Registration[];
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationsState = {
  userRegistrations: [],
  loading: false,
  error: null,
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserRegistrations: (state, action: PayloadAction<Registration[]>) => {
      state.userRegistrations = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRegistration: (state, action: PayloadAction<Registration>) => {
      state.userRegistrations.push(action.payload);
    },
    removeRegistration: (state, action: PayloadAction<string>) => {
      state.userRegistrations = state.userRegistrations.filter(
        (reg) => reg.id !== action.payload
      );
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
  setUserRegistrations,
  addRegistration,
  removeRegistration,
  setError,
  clearError,
} = registrationsSlice.actions;
export default registrationsSlice.reducer;
