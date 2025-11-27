import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../constants/config";
import { AppDispatch } from "../store";
import { logout } from "../store/slices/auth";

interface LogoutButtonProps {
  onPress?: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          dispatch(logout());
          onPress?.();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  text: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
