import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatsScreen from "./screens/ChatsScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchScreen from "./screens/MatchScreen";
import MessagesScreen from "./screens/MessagesScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, initialUser } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {initialUser ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatsScreen} />
            <Stack.Screen name="Message" component={MessagesScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "containedTransparentModal" }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "containedTransparentModal" }}
          >
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
