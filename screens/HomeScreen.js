import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { styled } from "nativewind";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const StyledSafeAreaView = styled(SafeAreaView);
const HomeScreen = () => {
  const navigation = useNavigation();
  const [finishedCards, setFinishedCards] = React.useState(false);
  const { user, logout, initialUser } = useAuth();
  const [cards, setCards] = React.useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() =>
    onSnapshot(doc(db, "users", initialUser.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    })
  );

  useEffect(() => {
    const fetchCards = async () => {
      // console.log(user);
      if (user) {
        const passes = await getDocs(
          collection(db, "users", user.id, "passes")
        ).then((snapshot) => snapshot.docs.map((doc) => doc?.id));

        const yesses = await getDocs(
          collection(db, "users", user.id, "yesses")
        ).then((snapshot) => snapshot.docs.map((doc) => doc?.id));

        const passedUserIds = passes.length > 0 ? passes : ["test"];
        const yessedUserIds = passes.length > 0 ? yesses : ["test"];
        onSnapshot(
          query(
            collection(db, "users"),
            where("id", "not-in", [...passedUserIds, ...yessedUserIds])
          ),
          (snapshot) => {
            const cards = snapshot?.docs
              ?.filter(
                (doc) =>
                  doc?.id !== user?.id && doc.data()?.sex === user?.interestedIn
              )
              ?.map((doc) => ({
                id: doc?.id,
                ...doc.data(),
              }));
            setCards(cards);
          }
        );
      }
    };
    fetchCards();
  }, [db, user]);

  return (
    <>
      <StyledSafeAreaView className="flex h-full flex-col justify-between bg-red-400">
        <View className="flex flex-row justify-between align-middle items-center p-3">
          <TouchableOpacity className="" onPress={() => logout()}>
            <Image
              alt="profile picture"
              className="h-12 w-12 rounded-full "
              source={{ uri: user?.profilePic ?? initialUser.photoURL }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("Modal")}
          >
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
        <View className="absolute top-16">
          <Swiper
            key={cards.length}
            ref={swipeRef}
            onSwipedAll={() => setCards([])}
            onSwipedLeft={(cardIndex) => {
              if (!cards[cardIndex]) return;

              const userSwiped = cards[cardIndex];
              console.log("swiped left", userSwiped.displayName);

              setDoc(
                doc(db, "users", user.id, "passes", userSwiped.id),
                userSwiped
              );
            }}
            onSwipedRight={(cardIndex) => {
              if (!cards[cardIndex]) return;

              const userSwiped = cards[cardIndex];

              getDoc(doc(db, "users", userSwiped.id, "yesses", user.id)).then(
                (documentSnapshot) => {
                  console.log("user", user);
                  console.log("userSwiped", userSwiped);
                  console.log(documentSnapshot.exists());
                  if (documentSnapshot.exists()) {
                    console.log("They have said yes before you.");
                    console.log("you matched with", userSwiped.displayName);
                    setDoc(
                      doc(db, "users", user.id, "yesses", userSwiped.id),
                      userSwiped
                    );

                    setDoc(
                      doc(db, "matches", generateId(user.id, userSwiped.id)),
                      {
                        users: {
                          [user.id]: user,
                          [userSwiped.id]: userSwiped,
                        },
                        usersMatched: [user.id, userSwiped.id],
                        timestamp: serverTimestamp(),
                      }
                    );
                    navigation.navigate("Match", { user, userSwiped });
                  } else {
                    console.log("swiped right on", userSwiped.displayName);
                    setDoc(
                      doc(db, "users", user.id, "yesses", userSwiped.id),
                      userSwiped
                    );
                  }
                }
              );
            }}
            stackSize={cards.length > 0 ? cards.length : 5}
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
            cards={cards.length > 0 ? cards : []}
            backgroundColor="#4FD0E9"
            renderCard={(card, cardIdx) => {
              return card ? (
                <View
                  key={card?.id}
                  style={styles.cardShadow}
                  className="bg-white h-5/6 rounded-xl flex flex-column shadow-2xl"
                >
                  {console.log(card)}
                  <Image
                    className="h-4/6 w-full rounded-t-xl"
                    source={{
                      uri: `${card?.profilePic}`,
                    }}
                  />
                  <View className="bg-white rounded-b-xl h-1/4 w-full flex align-middle justify-center ">
                    <View className="flex flex-row justify-between px-4">
                      <View>
                        <Text className="text-xl font-bold ">
                          {card?.displayName}
                        </Text>
                        <Text className="">{card?.occupation}</Text>
                        <Text className="">{card?.quote}</Text>
                      </View>
                      <Text className="text-xl font-bold ">{card?.age}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={styles.cardShadow}
                  className="bg-white h-5/6 rounded-xl flex flex-column shadow-2xl items-center justify-center"
                >
                  <Image
                    className="h-4/6 w-full rounded-t-xl"
                    style={{ height: 200, width: 200 }}
                    source={require("../assets/sadEmoji.png")}
                  />
                  <Text className="text-xl font-bold">No more profiles</Text>
                </View>
              );
            }}
          />
        </View>
        <View className="flex flex-row justify-evenly mb-10">
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          >
            <Entypo name="cross" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          >
            <AntDesign name="heart" size={24} />
          </TouchableOpacity>
        </View>
        {/* <Text>I am the HomeScreen</Text>
        <Button
          title="Go to Chats"
          onPress={() => navigation.navigate("Chat")}
        />
        <Button title="Logout" onPress={() => logout()} /> */}
      </StyledSafeAreaView>
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
    shadowRadius: 2.22,
    elevation: 3,
  },
});
export default HomeScreen;
