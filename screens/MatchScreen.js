import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { user, userSwiped } = params;

  return (
    <SafeAreaView>
      <View className="flex bg-red-300 w-full  h-full rounded-3xl mt-16 p-4 align-middle content-center justify-center items-center space-y-10 ">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="absolute top-5 right-5"
        >
          <AntDesign name="close" size={32} color="white" />
        </TouchableOpacity>
        <Image
          className=" w-56 h-20 "
          resizeMode="contain"
          source={require("../assets/matchText.png")}
        />
        <Text className="font-bold text-md">
          You and {userSwiped.displayName} have liked each other!
        </Text>
        <View className="flex flex-row justify-around items-center align-middle space-x-5 ">
          <Image
            className=" h-32 w-32 rounded-full"
            source={{ uri: user.profilePic }}
          />
          <Image
            className=" h-32 w-32 rounded-full"
            source={{ uri: userSwiped.profilePic }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          className="w-4/5 h-20 text-center  justify-center items-center rounded-full bg-white"
        >
          <Text className="text-lg font-semibold">Send a Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MatchScreen;
