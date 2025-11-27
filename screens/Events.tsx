import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { eventsAPI } from "../services/api";
import { AppDispatch, RootState } from "../store";
import {
  clearError,
  setError,
  setEvents,
  setLoading,
} from "../store/slices/events";

export default function Events({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: events,
    loading,
    error,
  } = useSelector((state: RootState) => state.events);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await eventsAPI.getAll();
      dispatch(setEvents(response.data));
      dispatch(clearError());
    } catch {
      const errorMessage = "Failed to fetch events";
      dispatch(setError(errorMessage));
      Alert.alert("Error", errorMessage);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event: any) => {
    navigation.navigate("EventDetails", { eventId: event.id });
  };

  const renderEventItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.eventImage}
        defaultSource={require("../assets/images/react-logo.png")}
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <View style={styles.eventFooter}>
          <Text style={styles.eventLocation}>{item.location}</Text>
          <Text style={styles.eventPrice}>
            {item.price === 0 ? "Free" : `$${item.price}`}
          </Text>
        </View>
        <Text style={styles.eventSpots}>
          {item.availableSpots} spots available
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && events.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Upcoming Events</Text>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  errorBanner: {
    backgroundColor: "#e74c3c",
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
  },
  errorText: {
    color: "#fff",
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 12,
    color: "#999",
    flex: 1,
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2196F3",
  },
  eventSpots: {
    fontSize: 11,
    color: "#27ae60",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
});
