import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const AllPlacesPage = () => {
  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.subtitle}>All Places</Text>
      <Button
        mode="contained"
        style={dynamicStyles.button}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Let's Start
      </Button>
    </View>
  );
};
const dynamicStyles = StyleSheet.create({
  container: {
    padding: 24,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
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
export default AllPlacesPage;
