import { View, Text } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const Header = ({ title, callEnabled, profileImage }) => {
  const navigation = useNavigation();
  return (
    <View className="flex p-2 flex-row items-center justify-between ">
      <View className="flex flex-row items-center justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <View className="flex-row align-middle items-center justify-center">
          {profileImage ? (
            <Image
              className="w-8 h-8 rounded-full"
              source={{ uri: profileImage }}
            />
          ) : null}
          <Text className="text-2xl font-bold pl-2">{title}</Text>
        </View>
      </View>
      {callEnabled && (
        <TouchableOpacity className="p-4">
          <Foundation name="telephone" size={34} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
