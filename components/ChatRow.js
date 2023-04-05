import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { StyleSheet } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [lastMessage, setLastMessage] = React.useState(null);
  const [matchedUser, setMatchedUser] = React.useState(
    matchDetails.users[
      `${matchDetails.usersMatched.filter((word) => word !== user.id)[0]}`
    ]
  );

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setLastMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
        )
    );
  }, [db]);

  return (
    <TouchableOpacity
      className="flex flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.rowShadow}
      onPress={() => {
        navigation.navigate("Message", {
          matchedUser: { ...matchedUser },
          ...matchDetails,
        });
      }}
    >
      <Image
        className="h-16 w-16 rounded-full mr-4"
        source={{ uri: matchedUser?.profilePic }}
      />
      <View>
        <Text className="font-semibold text-lg">
          {matchedUser?.displayName}
        </Text>
        <Text>
          {console.log(lastMessage.userId, user.id)}
          {lastMessage
            ? lastMessage.userId === user.id
              ? "You: " + lastMessage.message
              : matchedUser.displayName + ": " + lastMessage.message
            : "Say Hi"}
        </Text>
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
