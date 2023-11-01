import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBrfl1ate8hm8P_v65REDBecrZHtbS3I8",
  authDomain: "geargurus-inno.firebaseapp.com",
  projectId: "geargurus-inno",
  storageBucket: "geargurus-inno.appspot.com",
  messagingSenderId: "563762791185",
  appId: "1:563762791185:web:e42a2560ea37ee368842b0"
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, firebase };
