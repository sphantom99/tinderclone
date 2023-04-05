import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { StyleSheet } from "react-native";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  console.log(matchDetails);
  const matchedUser = matchDetails.users[`${matchDetails.usersMatched[1]}`];
  console.log(matchedUser);
  return (
    <TouchableOpacity
      className="flex flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.rowShadow}
      onPress={() => navigation.navigate("Message", { ...matchedUser })}
    >
      <Image
        className="h-16 w-16 rounded-full mr-4"
        source={{ uri: matchedUser?.profilePic }}
      />
      <View>
        <Text className="font-semibold text-lg">
          {matchedUser?.displayName}
        </Text>
        <Text>{"Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  rowShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 2.22,
    elevation: 3,
  },
});
export default ChatRow;
