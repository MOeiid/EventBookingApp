import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import eventsReducer from "./slices/events";
import registrationsReducer from "./slices/registrations";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
