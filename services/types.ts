export interface User {
  id: string;
  email: string;
  name: string;
}

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

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventImage: string;
  registeredAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  EventsList: undefined;
  EventDetails: { eventId: string };
  Dashboard: undefined;
};
