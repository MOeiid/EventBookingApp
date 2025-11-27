import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { registrationsAPI } from "../services/api";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/slices/auth";
import {
  removeRegistration,
  setError,
  setLoading,
  setUserRegistrations,
} from "../store/slices/registrations";

export default function Dashboard({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userRegistrations, loading } = useSelector(
    (state: RootState) => state.registrations
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchRegistrations = async () => {
    if (!user) return;

    dispatch(setLoading(true));
    try {
      const response = await registrationsAPI.getUserRegistrations(user.id);
      dispatch(setUserRegistrations(response.data));
    } catch {
      dispatch(setError("Failed to fetch registrations"));
    }
  };

  useEffect(() => {
    if (user) {
      fetchRegistrations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRegistrations();
    setRefreshing(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          dispatch(logout());
        },
        style: "destructive",
      },
    ]);
  };

  const handleCancelRegistration = (
    registrationId: string,
    eventTitle: string
  ) => {
    Alert.alert(
      "Cancel Registration",
      `Are you sure you want to cancel your registration for "${eventTitle}"?`,
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await registrationsAPI.cancelRegistration(registrationId);
              dispatch(removeRegistration(registrationId));
              Alert.alert("Success", "Registration cancelled successfully");
            } catch {
              Alert.alert("Error", "Failed to cancel registration");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderRegistrationItem = ({ item }: any) => (
    <View style={styles.registrationCard}>
      <Image
        source={{ uri: item.eventImage }}
        style={styles.eventImage}
        defaultSource={require("../assets/images/react-logo.png")}
      />
      <View style={styles.registrationInfo}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.eventTitle}
        </Text>
        <Text style={styles.eventDate}>{item.eventDate}</Text>
        <Text style={styles.registeredAt}>
          Registered on {new Date(item.registeredAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelRegistration(item.id, item.eventTitle)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && userRegistrations.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading your registrations...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Dashboard</Text>
        {user && <Text style={styles.userName}>Welcome, {user.name}!</Text>}
      </View>

      <Text style={styles.sectionTitle}>Registered Events</Text>

      {userRegistrations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You have not registered for any events yet
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("Events")}
          >
            <Text style={styles.browseButtonText}>Browse Events</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userRegistrations}
          renderItem={renderRegistrationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#b5afb3ff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  registrationCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
  },
  registrationInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  registeredAt: {
    fontSize: 11,
    color: "#999",
    marginBottom: 8,
  },
  cancelButton: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  cancelButtonText: {
    color: "#e74c3c",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
