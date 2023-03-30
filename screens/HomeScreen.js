import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        className="absolute w-full h-full"
        source={require("../assets/27505.png")}
      />
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-between align-middle items-center p-3 mt-2">
          <TouchableOpacity className="" onPress={() => logout()}>
            <Image
              className="h-12 w-12 rounded-full "
              source={{ uri: user.photoURL }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="">
            <Image
              className="h-16 w-12 "
              source={require("../assets/tinderLogo.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbubble-ellipses" size={45} color="white" />
          </TouchableOpacity>
        </View>
        <View className="-mt-10">
          <Swiper
            // onSwipedAll={() => }
            stackSize={5}
            cardIndex={0}
            verticalSwipe={false}
            animateCardOpacity
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    // borderColor: "red",
                    color: "red",
                    // borderWidth: 1,
                    textAlign: "right",
                  },
                },
              },
              right: {
                title: "YEAP",
                style: {
                  label: {
                    marginTop: 20,
                    // borderColor: "green",
                    color: "green",
                    // borderWidth: 1,
                    textAlign: "left",
                  },
                },
              },
            }}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={[
              {
                quote: "Life's too short, make the most of it!",
                age: 25,
                id: 1,
                firstName: "John",
              },
              {
                quote: "Life's too short, make the most of it!",
                age: 25,
                id: 2,
                firstName: "Jane",
              },
              {
                quote: "Life's too short, make the most of it!",
                age: 25,
                id: 3,
                firstName: "Jim",
              },
              {
                quote: "Life's too short, make the most of it!",
                age: 25,
                id: 4,
                firstName: "George",
              },
              {
                quote: "Life's too short, make the most of it!",
                age: 25,
                id: 5,
                firstName: "Alex",
              },
            ]}
            renderCard={(card) => (
              <View
                key={card.id}
                style={styles.cardShadow}
                className="bg-white h-4/6 rounded-xl flex flex-column shadow-2xl"
              >
                <Image
                  className="h-full w-full rounded-t-xl"
                  source={{
                    uri: `https://randomuser.me/api/portraits/men/${card.id}.jpg`,
                  }}
                />
                <View className="bg-white rounded-b-xl h-1/4 w-full flex align-middle justify-center ">
                  <View className="flex flex-row justify-between px-4">
                    <View>
                      <Text className="text-xl font-bold ">
                        {card.firstName}
                      </Text>
                      <Text className="">{card.quote}</Text>
                    </View>
                    <Text className="text-xl font-bold ">{card.age}</Text>
                  </View>
                </View>
              </View>
            )}
          ></Swiper>
        </View>
        {/* <Text>I am the HomeScreen</Text>
        <Button
          title="Go to Chats"
          onPress={() => navigation.navigate("Chat")}
        />
        <Button title="Logout" onPress={() => logout()} /> */}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
export default HomeScreen;
