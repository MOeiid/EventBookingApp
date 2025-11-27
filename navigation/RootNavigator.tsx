import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Dashboard from "../screens/Dashboard";
import EventDetails from "../screens/EventDetails";
import Events from "../screens/Events";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EventsList" component={Events} />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          title: "Event Details",
          headerShown: true,
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName = "home";

          if (route.name === "EventsTab") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "DashboardTab") {
            iconName = focused ? "account" : "account-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={24}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
      })}
    >
      <Tab.Screen
        name="EventsTab"
        component={EventsStack}
        options={{
          title: "Events",
        }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={Dashboard}
        options={{
          title: "Dashboard",
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
