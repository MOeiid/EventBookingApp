import axios from "axios";
import { mockEvents, mockRegistrations, mockUsers } from "./mockData";

const API_BASE_URL = "https://66ca77b7f8172620a0de65c5.mockapi.io/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      return await api.post("/auth/login", { email, password });
    } catch (error) {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        return {
          data: { id: user.id, email: user.email, name: user.name },
        };
      }
      throw error;
    }
  },
  signup: async (email: string, password: string, name: string) => {
    try {
      return await api.post("/auth/signup", { email, password, name });
    } catch (error) {
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
      };
      return {
        data: { id: newUser.id, email: newUser.email, name: newUser.name },
      };
    }
  },
};

export const eventsAPI = {
  getAll: async () => {
    try {
      return await api.get("/events");
    } catch (error) {
      return { data: mockEvents };
    }
  },
  getById: async (id: string) => {
    try {
      return await api.get(`/events/${id}`);
    } catch (error) {
      const event = mockEvents.find((e) => e.id === id);
      if (event) {
        return { data: event };
      }
      throw error;
    }
  },
};

export const registrationsAPI = {
  register: async (userId: string, eventId: string) => {
    try {
      return await api.post("/registrations", { userId, eventId });
    } catch (error) {
      const newReg = {
        id: Date.now().toString(),
        userId,
        eventId,
        eventTitle: mockEvents.find((e) => e.id === eventId)?.title || "",
        eventDate: mockEvents.find((e) => e.id === eventId)?.date || "",
        eventImage: mockEvents.find((e) => e.id === eventId)?.image || "",
        registeredAt: new Date().toISOString(),
      };
      return { data: newReg };
    }
  },
  getUserRegistrations: async (userId: string) => {
    try {
      return await api.get(`/registrations?userId=${userId}`);
    } catch (error) {
      return {
        data: mockRegistrations.filter((r) => r.userId === userId),
      };
    }
  },
  cancelRegistration: async (registrationId: string) => {
    try {
      return await api.delete(`/registrations/${registrationId}`);
    } catch (error) {
      return { data: { id: registrationId } };
    }
  },
};

export default api;
