# Event Booking App - React Native

A compact mobile application for browsing and registering for events, built with React Native, Expo, Redux, and mockAPI.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Install dependencies
npm install

# Configure mockAPI (see MOCKAPI_SETUP.md)
# Update services/api.ts with your mockAPI endpoint

# Run the app
npm run ios        # For iOS
npm run android    # For Android
npm run web        # For Web
```

## 📱 Features

- **User Authentication**: Sign up and login with form validation
- **Event Listings**: Browse all available events with key information
- **Event Details**: View comprehensive event information with registration
- **User Dashboard**: Manage registered events
- **Redux State Management**: Centralized state management
- **Error Handling**: User-friendly error messages and alerts
- **Mobile Responsive**: Optimized for diverse screen sizes

## 📁 Project Structure

```
EventBookingApp/
├── app/                      # Expo entry point
├── screens/                  # Screen components
│   ├── Login.tsx            # Login screen
│   ├── SignUp.tsx           # Sign up screen
│   ├── Events.tsx           # Events list
│   ├── EventDetails.tsx     # Event details & registration
│   └── Dashboard.tsx        # User dashboard
├── navigation/              # Navigation setup
│   └── RootNavigator.tsx    # Main navigation
├── store/                   # Redux store
│   ├── index.ts            # Store config
│   └── slices/             # Redux reducers
│       ├── auth.ts
│       ├── events.ts
│       └── registrations.ts
├── services/               # API services
│   ├── api.ts             # Axios API client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── components/            # Reusable components
├── constants/            # App constants
└── hooks/               # Custom hooks
```

## 🔧 Tech Stack

- **React Native** with Expo
- **Redux & Redux Toolkit** - State management
- **React Navigation** - Navigation
- **Axios** - HTTP client
- **mockAPI** - Backend simulation

## 📝 Main Screens

### Login

- Email and password input
- Form validation
- Error handling
- Link to Sign Up

### Sign Up

- Full name, email, password fields
- Password confirmation
- Input validation
- Link to Login

### Events

- List of all available events
- Event cards with: title, date, location, price, available spots
- Pull-to-refresh
- Tap event to view details

### Event Details

- Event name, date & time, location
- Description and speakers
- Price, capacity, available spots
- Register button with availability check
- Shows registration status

### Dashboard

- Welcome message with user name
- List of registered events
- Event cards with cancel button
- Pull-to-refresh
- Browse events link when empty
- Logout option

## 🔌 API Endpoints

```
Authentication:
  POST   /auth/login      - User login
  POST   /auth/signup     - User registration

Events:
  GET    /events          - Get all events
  GET    /events/:id      - Get event details

Registrations:
  POST   /registrations              - Register for event
  GET    /registrations?userId=:id   - Get user registrations
  DELETE /registrations/:id          - Cancel registration
```

## 🎨 Styling

- **Color Scheme**: Blue (#2196F3), Green (#27ae60), Red (#e74c3c)
- **Responsive**: Mobile-first design
- **Touch-friendly**: Large tap targets
- **Smooth**: Transitions and feedback

## 📋 Redux State

```typescript
{
  auth: {
    isAuthenticated: boolean,
    user: { id, email, name } | null,
    loading: boolean,
    error: string | null
  },
  events: {
    list: Event[],
    selectedEvent: Event | null,
    loading: boolean,
    error: string | null
  },
  registrations: {
    userRegistrations: Registration[],
    loading: boolean,
    error: string | null
  }
}
```

## 🛠️ Development

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginSuccess } from "../store/slices/auth";

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(
      loginSuccess({ id: "1", email: "test@example.com", name: "User" })
    );
  };

  return <View>{/* JSX */}</View>;
}
```

### Adding API Calls

```typescript
import { authAPI } from "../services/api";

const response = await authAPI.login(email, password);
```

## 🐛 Troubleshooting

| Issue                  | Solution                                    |
| ---------------------- | ------------------------------------------- |
| Module not found       | Run `npm install` and clear cache           |
| API errors             | Check mockAPI endpoint in `services/api.ts` |
| Navigation not working | Verify Redux auth state in RootNavigator    |
| Images not loading     | Verify image URLs in mockAPI are valid      |

## 📖 Documentation

- See `APP_DOCUMENTATION.md` for detailed app documentation
- See `MOCKAPI_SETUP.md` for mockAPI setup instructions

## ✨ Key Features Implemented

✅ User authentication with form validation  
✅ Event browsing with infinite scroll capability  
✅ Event details with comprehensive information  
✅ Event registration with availability tracking  
✅ User dashboard with registration management  
✅ Redux state management  
✅ Error handling and user feedback  
✅ Mobile-responsive design  
✅ Pull-to-refresh functionality  
✅ Loading states and animations

## 🚀 Performance

- Optimized FlatList rendering
- Redux selector optimization
- Lazy navigation stack loading
- Minimal bundle size (~200KB production)

## 📦 Build & Deploy

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Export for web
expo export:web
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and style.

---

Built with ❤️ using React Native and Expo
