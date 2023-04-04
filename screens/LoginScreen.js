import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), []);
  console.log("login", user);
  const [loadingInitial, setLoadingInitial] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user is logged in");
          setUser(user);
        } else {
          console.log("user is logged out");
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const [error, setError] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "29097968040-vl0u3kff0ecgq3llo195h53reijoa8oe.apps.googleusercontent.com",
    androidClientId:
      "29097968040-v7c77cev6n8p57uifg3mcqaoq0jc2c75.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  });

  async function signInWithGoogle() {
    setLoading(true);
    try {
      await promptAsync();

      // console.log("resposne", response);
      if (response?.type === "success") {
        // console.log(response);
        const { idToken, accessToken } = response.authentication;
        // console.log("idToken", idToken);
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        // console.log("cred", credential);
        const userCred = await signInWithCredential(auth, credential);
        // console.log("userCred", JSON.stringify(userCred));
        // console.log("uid", userCred.user.uid);
        const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
        const userData = userDoc.data();
        // console.log("data", userData);
        if (userData !== undefined) {
          setUser(userData);
        }
        // const userRef = db.collection("users").doc(userCred.user.uid);
        // const newUserInfo = await userRef.get();
        // console.log("newUserInfo", newUserInfo);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-red-400">
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
        disabled={!request}
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
