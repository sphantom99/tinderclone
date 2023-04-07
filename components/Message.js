import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

const Message = ({ userMessage, swipedUserProfilePic, message }) => {
  return (
    <View className={`flex-row items-center ${userMessage ? "ml-auto" : null}`}>
      {userMessage ? null : (
        <Image
          className="h-8 w-8 rounded-full"
          source={{ uri: swipedUserProfilePic }}
        />
      )}
      <View
        className={` rounded-lg ${
          userMessage
            ? "bg-purple-600 rounded-tr-none "
            : "bg-red-400 rounded-tl-none "
        }  px-5 py-3 mx-3 my-2 self-start `}
      >
        <Text className="text-white ">{message.message}</Text>
      </View>
    </View>
  );
};

export default Message;
