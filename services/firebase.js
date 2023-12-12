import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBrfl1ate8hm8P_v65REDBecrZHtbS3I8",
  authDomain: "geargurus-inno.firebaseapp.com",
  projectId: "geargurus-inno",
  storageBucket: "geargurus-inno.appspot.com",
  messagingSenderId: "563762791185",
  appId: "1:563762791185:web:e42a2560ea37ee368842b0",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, app };
