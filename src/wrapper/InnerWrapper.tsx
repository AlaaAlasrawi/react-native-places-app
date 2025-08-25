import React from "react";
import { PaperProvider } from "react-native-paper";
import NavigationWrapper from "./NavigationWrapper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const InnerWrapper = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationWrapper />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default InnerWrapper;
