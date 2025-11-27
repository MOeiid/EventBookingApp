export const mockUsers = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
  {
    id: "2",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
  },
];

export const mockEvents = [
  {
    id: "1",
    title: "React Native Workshop",
    description: "Learn React Native development from basics to advanced",
    date: "2025-12-01",
    time: "10:00 AM",
    location: "San Francisco, CA",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    speakers: ["John Smith", "Jane Doe"],
    capacity: 100,
    availableSpots: 45,
  },
  {
    id: "2",
    title: "Web Development Summit",
    description: "Learn the latest trends in web development",
    date: "2025-12-05",
    time: "2:00 PM",
    location: "New York, NY",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    speakers: ["Mark Wilson", "Sarah Chen"],
    capacity: 150,
    availableSpots: 62,
  },
  {
    id: "3",
    title: "Mobile App Design",
    description: "Master mobile app UI/UX design principles",
    date: "2025-12-10",
    time: "11:00 AM",
    location: "Austin, TX",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    speakers: ["Emma Davis"],
    capacity: 80,
    availableSpots: 35,
  },
];

export const mockRegistrations = [
  {
    id: "1",
    userId: "1",
    eventId: "1",
    eventTitle: "React Native Workshop",
    eventDate: "2025-12-01",
    eventImage:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    registeredAt: "2025-11-10T10:00:00Z",
  },
];
