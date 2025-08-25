import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList, Place } from "../types/general";
import PlaceService from "../services/PlaceService";

type DetailsRoute = RouteProp<RootStackParamList, "PlaceDetailsPage">;

export default function PlaceDetailsPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { params } = useRoute<DetailsRoute>();
  const { place } = params;

  const [title, setTitle] = useState(place.title ?? "");
  const [address, setAddress] = useState(place.address ?? "");

  async function handleSave(): Promise<void> {
    const updated: Place = {
      ...place,
      title: title.trim(),
      address: address.trim(),
    };
    await PlaceService.updatePlace(updated);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Place</Text>
      <Text style={styles.meta}>ID: {place.id}</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  header: { fontSize: 20, fontWeight: "700" },
  meta: { color: "#666", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
});
