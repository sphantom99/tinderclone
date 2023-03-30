import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { user, signInWithGoogle, request } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), []);
  console.log("login", user);
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={require("../assets/27505.png")}
      ></ImageBackground>
      <Text
        style={{ marginHorizontal: "37%" }}
        className="absolute top-20 w-52 text-white text-3xl font-bold"
      >
        Tinder
      </Text>
      <Image
        className="absolute "
        resizeMode="center"
        source={require("../assets/tinderLogo.png")}
        style={{ width: "80%", height: "80%", marginHorizontal: "10%" }}
      />
      <TouchableOpacity
        style={{ marginHorizontal: "20%" }}
        className="  bottom-40 w-52 absolute bg-white p-4 rounded-2xl text-align-center"
        onPress={() => {
          console.log("clicked");
          signInWithGoogle();
        }}
      >
        <Text className=" font-semibold text-black text-lg w-full">
          Sign in & Start swiping
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
