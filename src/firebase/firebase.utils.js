// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx274iYQFmxKAZAJyKNNGy_jgq6sBIN8g",
  authDomain: "exp-db-3648c.firebaseapp.com",
  projectId: "exp-db-3648c",
  storageBucket: "exp-db-3648c.appspot.com",
  messagingSenderId: "448045590054",
  appId: "1:448045590054:web:094dc96c7ed3b8ecd528e7",
  measurementId: "G-S9BGD66G6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signout = () => signOut(auth);