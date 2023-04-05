import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

const MessagesScreen = () => {
  const { params } = useRoute();
  return (
    <SafeAreaView>
      <Header
        title={params.displayName}
        callEnabled
        profileImage={params.profilePic}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
