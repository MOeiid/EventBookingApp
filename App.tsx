import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

import RootNavigator from "./navigation/RootNavigator";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
