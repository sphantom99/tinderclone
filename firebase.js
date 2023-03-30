// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHnIW8ND3Vnm5VTpz8nU24I3axn5xqrm4",
  authDomain: "tinderclone-381923.firebaseapp.com",
  projectId: "tinderclone-381923",
  storageBucket: "tinderclone-381923.appspot.com",
  messagingSenderId: "29097968040",
  appId: "1:29097968040:web:c5d90fd54395c587715d9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
