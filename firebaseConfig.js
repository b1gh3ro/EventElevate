// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbA2F9zqA7b_y5z7BHL94uxTLeULrwI2o",
  authDomain: "eventelevate-69c67.firebaseapp.com",
  projectId: "eventelevate-69c67",
  storageBucket: "eventelevate-69c67.appspot.com",
  messagingSenderId: "151909814157",
  appId: "1:151909814157:web:afa9f193e229f8108737c4",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FirebaseDB = getFirestore(FirebaseApp);
