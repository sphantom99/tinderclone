import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import useAuth from "../hooks/useAuth";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const StyledSafeAreaView = styled(SafeAreaView);
const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [profilePic, setProfilePic] = React.useState(null);
  const [occupation, setOccupation] = React.useState(null);
  const [quote, setQuote] = React.useState(null);
  const [age, setAge] = React.useState(null);

  const updateProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      profilePic,
      occupation,
      quote,
      age,
      timestamp: serverTimestamp(),
    }).then(() => navigation.navigate("Home"));
  };

  const incompleteForm = !profilePic || !occupation || !quote || !age;
  return (
    <StyledSafeAreaView>
      <View className="w-full m-auto h-full rounded-lg bg-white mt-5 p-4 text-center items-center space-y-5">
        <View className="flex flex-row justify-center space-x-2 align-middle items-center">
          <Image
            className="w-10 h-10"
            resizeMode="contain"
            source={require("../assets/tinderLogoColor.png")}
          ></Image>
          <Text className=" font-medium text-black text-4xl">tinder</Text>
        </View>
        <Text className="mt-5 text-lg font-bold text-center">
          Welcome {user.displayName}
        </Text>
        <Text className="mt-5 text-md font-bold text-center text-red-400">
          Step 1: The Profile Pic
        </Text>
        <TextInput
          value={profilePic}
          onChangeText={(text) => setProfilePic(text)}
          className="text-center text-xl pb-2"
          placeholder="Profile Pic URL"
        />
        <Text className="mt-5 text-md font-bold text-center text-red-400">
          Step 2: The Job
        </Text>
        <TextInput
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
          className="text-center text-xl pb-2"
          placeholder="Occupation"
        />
        <Text className="mt-5 text-md font-bold text-center text-red-400">
          Step 3: The Quote
        </Text>
        <TextInput
          value={quote}
          onChangeText={(text) => setQuote(text)}
          className="text-center text-xl pb-2"
          placeholder="What is your motto?"
        />
        <Text className="mt-5 text-md font-bold text-center text-red-400">
          Step 4: The Age
        </Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          className="text-center text-xl pb-2"
          placeholder="Age"
          keyboardType="numeric"
          maxLength={2}
        />

        <TouchableOpacity
          disabled={incompleteForm}
          className={` absolute bottom-10 w-30 p-4 rounded-xl  ${
            incompleteForm ? "bg-gray-400" : "bg-red-400"
          }`}
        >
          <Text className="text-xl text-white ">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </StyledSafeAreaView>
  );
};

export default ModalScreen;
