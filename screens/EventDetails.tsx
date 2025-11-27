import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { eventsAPI, registrationsAPI } from "../services/api";
import { AppDispatch, RootState } from "../store";
import {
  setError,
  setLoading,
  setSelectedEvent,
  updateEventAvailability,
} from "../store/slices/events";
import { addRegistration } from "../store/slices/registrations";

export default function EventDetails({ route, navigation }: any) {
  const { eventId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEvent, loading } = useSelector(
    (state: RootState) => state.events
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { userRegistrations } = useSelector(
    (state: RootState) => state.registrations
  );
  const [registering, setRegistering] = useState(false);

  const isRegistered = userRegistrations.some((reg) => reg.eventId === eventId);

  const fetchEventDetails = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await eventsAPI.getById(eventId);
      dispatch(setSelectedEvent(response.data));
    } catch {
      dispatch(setError("Failed to fetch event details"));
      Alert.alert("Error", "Could not load event details");
    }
  }, [eventId, dispatch]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleRegister = async () => {
    if (!user) {
      Alert.alert("Error", "Please login to register for events");
      return;
    }

    if (!selectedEvent) return;

    if (selectedEvent.availableSpots <= 0) {
      Alert.alert("Error", "No available spots for this event");
      return;
    }

    setRegistering(true);
    try {
      const response = await registrationsAPI.register(user.id, eventId);
      const registration = response.data;

      dispatch(
        addRegistration({
          id: registration.id,
          userId: user.id,
          eventId,
          eventTitle: selectedEvent.title,
          eventDate: selectedEvent.date,
          eventImage: selectedEvent.image,
          registeredAt: new Date().toISOString(),
        })
      );

      dispatch(updateEventAvailability({ eventId, spotsReduced: 1 }));

      Alert.alert(
        "Success",
        "You have successfully registered for this event!"
      );
      navigation.goBack();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setRegistering(false);
    }
  };

  if (loading || !selectedEvent) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: selectedEvent.image }}
          style={styles.eventImage}
          defaultSource={require("../assets/images/react-logo.png")}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{selectedEvent.title}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detail}>
              <Text style={styles.label}>Date & Time</Text>
              <Text style={styles.value}>
                {selectedEvent.date} {selectedEvent.time}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{selectedEvent.location}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>
                {selectedEvent.price === 0 ? "Free" : `$${selectedEvent.price}`}
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Capacity</Text>
              <Text style={styles.value}>
                {selectedEvent.capacity} attendees
              </Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.label}>Available Spots</Text>
              <Text
                style={[
                  styles.value,
                  selectedEvent.availableSpots === 0 && styles.valueRed,
                ]}
              >
                {selectedEvent.availableSpots}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{selectedEvent.description}</Text>
          </View>
          {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Speakers</Text>
              {selectedEvent.speakers.map((speaker: string, index: number) => (
                <Text key={index} style={styles.speaker}>
                  • {speaker}
                </Text>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.registerButton,
              (isRegistered ||
                selectedEvent.availableSpots === 0 ||
                registering) &&
                styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={
              isRegistered || selectedEvent.availableSpots === 0 || registering
            }
          >
            {registering ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>
                {isRegistered ? "Already Registered" : "Register Now"}
              </Text>
            )}
          </TouchableOpacity>
          {selectedEvent.availableSpots === 0 && (
            <Text style={styles.soldOutText}>This event is fully booked</Text>
          )}{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  eventImage: {
    width: "100%",
    height: 250,
    backgroundColor: "#e0e0e0",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  valueRed: {
    color: "#e74c3c",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  speaker: {
    fontSize: 14,
    color: "#333",
    marginVertical: 6,
  },
  registerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  soldOutText: {
    color: "#e74c3c",
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
