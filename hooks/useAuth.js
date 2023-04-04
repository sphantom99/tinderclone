import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         console.log("user is logged in");
  //         setUser(user);
  //       } else {
  //         console.log("user is logged out");
  //         setUser(null);
  //       }
  //       setLoadingInitial(false);
  //     }),
  //   []
  // );

  // const [error, setError] = React.useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "29097968040-vl0u3kff0ecgq3llo195h53reijoa8oe.apps.googleusercontent.com",
  //   androidClientId:
  //     "29097968040-v7c77cev6n8p57uifg3mcqaoq0jc2c75.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  //   permissions: ["public_profile", "email", "gender", "location"],
  //   useProxy: true,
  // });

  const logout = async () => {
    signOut(auth).catch((err) => {
      console.log(err);
      setError(err);
    });
    setUser(null);
  };

  // async function signInWithGoogle() {
  //   setLoading(true);
  //   try {
  //     await promptAsync();

  //     // console.log("resposne", response);
  //     if (response?.type === "success") {
  //       // console.log(response);
  //       const { idToken, accessToken } = response.authentication;
  //       // console.log("idToken", idToken);
  //       const credential = GoogleAuthProvider.credential(idToken, accessToken);
  //       // console.log("cred", credential);
  //       const userCred = await signInWithCredential(auth, credential);
  //       // console.log("userCred", JSON.stringify(userCred));
  //       console.log("uid", userCred.user.uid);
  //       const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
  //       const userData = userDoc.data();
  //       console.log("data", userData);
  //       if (userData !== undefined) {
  //         setUser(userData);
  //       }
  //       // const userRef = db.collection("users").doc(userCred.user.uid);
  //       // const newUserInfo = await userRef.get();
  //       // console.log("newUserInfo", newUserInfo);
  //     }
  //     return Promise.reject();
  //   } catch (err) {
  //     console.log(err);
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const memoedValue = React.useMemo(
    () => ({
      user,
      logout,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
export default function useAuth() {
  return React.useContext(AuthContext);
}
