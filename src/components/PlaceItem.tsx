import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Place } from "../types/general";

export interface PlaceItemProps {
  place: Place;
  onSelect: (place: Place) => void;
  onDelete: (id: number) => void;
}

function PlaceItem({ place, onSelect, onDelete }: PlaceItemProps) {
  const uri = typeof place.image === "string" ? place.image : undefined;

  function handleSelect() {
    onSelect(place);
  }

  function handleDelete() {
    onDelete(place.id);
  }

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={handleSelect}
      activeOpacity={0.7}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder]} />
      )}

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {place.title}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {place.address}
        </Text>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.delBtn}>
        <Text style={styles.delTxt}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", padding: 12, gap: 12 },
  thumb: { width: 54, height: 54, borderRadius: 8, backgroundColor: "#eee" },
  thumbPlaceholder: { backgroundColor: "#f0f0f0" },
  title: { fontSize: 16, fontWeight: "600" },
  address: { fontSize: 13, color: "#666", marginTop: 2 },
  delBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#f6e6e6",
  },
  delTxt: { color: "#b00020", fontWeight: "600" },
});
