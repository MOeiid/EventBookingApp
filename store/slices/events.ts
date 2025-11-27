import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  speakers: string[];
  capacity: number;
  availableSpots: number;
}

interface EventsState {
  list: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  list: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
    updateEventAvailability: (
      state,
      action: PayloadAction<{ eventId: string; spotsReduced: number }>
    ) => {
      const event = state.list.find((e) => e.id === action.payload.eventId);
      if (event) {
        event.availableSpots -= action.payload.spotsReduced;
      }
      if (
        state.selectedEvent &&
        state.selectedEvent.id === action.payload.eventId
      ) {
        state.selectedEvent.availableSpots -= action.payload.spotsReduced;
      }
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
  setEvents,
  setSelectedEvent,
  updateEventAvailability,
  setError,
  clearError,
} = eventsSlice.actions;
export default eventsSlice.reducer;
