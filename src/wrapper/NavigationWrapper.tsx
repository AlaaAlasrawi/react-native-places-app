import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/general";
import AllPlacesPage from "../pages/AllPlacesPage";
import AddPlacePage from "../pages/AddPlacePage";
import PlaceDetailsPage from "../pages/PlaceDetailsPage";

const AppStack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationWrapper() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }}>
        <AppStack.Screen
          name="AllPlacesPage"
          component={AllPlacesPage}
          options={{ title: "All Places" }}
        />
        <AppStack.Screen
          name="AddPlacePage"
          component={AddPlacePage}
          options={{ title: "Add Place" }}
        />
        <AppStack.Screen
          name="PlaceDetailsPage"
          component={PlaceDetailsPage}
          options={{ title: "Place Details" }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
