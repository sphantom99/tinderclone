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
  const { user, logout } = useAuth();
  const [cards, setCards] = React.useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() =>
    onSnapshot(doc(db, "users", user.id ?? user.uid), (snapshot) => {
      console.log(snapshot);
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    })
  );

  useEffect(() => {
    const fetchCards = async () => {
      // console.log(user);
      const passes = await getDocs(
        collection(db, "users", user.id, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const yesses = await getDocs(
        collection(db, "users", user.id, "yesses")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

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
                doc.id !== user?.id && doc.data()?.sex === user?.interestedIn
            )
            ?.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          console.log(cards);
          setCards(cards);
        }
      );
    };
    fetchCards();
  }, [db, user]);

  return (
    <>
      <StyledSafeAreaView className="flex h-full flex-col justify-between bg-red-400">
        <View className="flex flex-row justify-between align-middle items-center p-3">
          <TouchableOpacity className="" onPress={() => logout()}>
            <Image
              className="h-12 w-12 rounded-full "
              source={{ uri: user?.profilePic }}
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
            ref={swipeRef}
            onSwipedAll={() => setFinishedCards(true)}
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
                  console.log(
                    "documentSnapshot",
                    JSON.stringify(documentSnapshot)
                  );
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
            cards={
              !finishedCards ? cards : [{ id: 0, displayName: "No more cards" }]

              /*[
                    {
                      job: "Software Engineer",
                      quote: "Life's too short, make the most of it!",
                      age: 25,
                      id: 1,
                      firstName: "John",
                    },
                    {
                      job: "Software Engineer",
                      quote: "Life's too short, make the most of it!",
                      age: 25,
                      id: 2,
                      firstName: "Jane",
                    },
                    {
                      job: "Software Engineer",
                      quote: "Life's too short, make the most of it!",
                      age: 25,
                      id: 3,
                      firstName: "Jim",
                    },
                    {
                      job: "Software Engineer",
                      quote: "Life's too short, make the most of it!",
                      age: 25,
                      id: 4,
                      firstName: "George",
                    },
                    {
                      job: "Software Engineer",
                      quote: "Life's too short, make the most of it!",
                      age: 25,
                      id: 5,
                      firstName: "Alex",
                    },
                  ] */
            }
            renderCard={(card) =>
              !finishedCards ? (
                <View
                  key={card?.id}
                  style={styles.cardShadow}
                  className="bg-white h-5/6 rounded-xl flex flex-column shadow-2xl"
                >
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
                  key={card?.id}
                  style={styles.cardShadow}
                  className="bg-white h-5/6 rounded-xl flex flex-column shadow-2xl"
                >
                  <Image
                    className="h-4/6 w-full rounded-t-xl"
                    style={{ height: 300, width: 300 }}
                    source={{
                      uri: "https://png.pngtree.com/png-vector/20210121/ourmid/pngtree-3d-emoji-expression-with-sad-face-on-transparent-png-image_2771802.jpg",
                    }}
                  />
                  <Text>No more profiles</Text>
                </View>
              )
            }
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
