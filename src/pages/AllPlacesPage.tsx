import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import PlaceService from "../services/PlaceService";
import { Place, RootStackParamList } from "../types/general";
import PlaceItem from "../components/PlaceItem";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

const AllPlacesPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPlaces = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await PlaceService.getPlaces();
      setPlaces(data);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPlaces();
    }, [loadPlaces])
  );

  const handleAdd = () => {
    navigation.navigate("AddPlacePage");
  };

  function handleSelect(place: Place): void {
    navigation.navigate("PlaceDetailsPage", { place: place });
  }

  async function handleDelete(id: number): Promise<void> {
    await PlaceService.deletePlace(id);
    await loadPlaces();
  }

  function keyExtractor(item: Place): string {
    return String(item.id);
  }

  function renderItem({ item }: { item: Place }) {
    return (
      <PlaceItem place={item} onSelect={handleSelect} onDelete={handleDelete} />
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={places}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={loadPlaces}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.subtitle}>All Places</Text>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={{ fontWeight: "bold", fontSize: 16 }}
              onPress={handleAdd}
            >
              Let&apos;s Start
            </Button>
          </View>
        }
        contentContainerStyle={places.length === 0 ? styles.center : undefined}
      />
    </View>
  );
};

export default AllPlacesPage;

const styles = StyleSheet.create({
  listContainer: { flex: 1, paddingVertical: 8 },
  center: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  empty: { alignItems: "center", justifyContent: "center", padding: 24 },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 300,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
});
