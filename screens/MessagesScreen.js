import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { FlatList } from "react-native";
import useAuth from "../hooks/useAuth";
import Message from "../components/Message";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
const MessagesScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchedUser } = params;
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: "1", message: "Hello", userId: "VcBX1QI0WdfySQQuWvR9Lks7lhx2" },
    { id: "2", message: "Hello", userId: "ZvDfjCPa6S1KmEnv9pQ8" },
  ]);
  console.log(params);
  const sendMessage = () => {
    console.log(input);
    addDoc(collection(db, "matches", params.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.id,
      message: input,
    });
    setInput("");
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", params.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      ),
    [db]
  );

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={matchedUser.displayName}
        callEnabled
        profileImage={matchedUser.profilePic}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted
            data={messages}
            className="pl-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => (
              <Message
                message={message}
                key={message.id}
                userMessage={message.userId === user.id}
                swipedUserProfilePic={matchedUser.profilePic}
              />
            )}
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t bg-white border-gray-300 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity onPress={sendMessage}>
            <MaterialCommunityIcons
              name="send-circle"
              size={34}
              color="#FF5864"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
