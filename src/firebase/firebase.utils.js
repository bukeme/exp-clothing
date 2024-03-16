// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then(result => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log({token, user});
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log({errorCode, errorMessage, email, credential})
  });
};
export const signout = () => {
  signOut(auth)
  .then(() => {
    console.log('Sign Out Successful')
  })
  .catch(error => {
    console.log(error.message);
  });
};

const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.exists());
  // console.log(userAuth);
  if (!docSnap.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();
    const newDocRef = doc(db, 'users', uid);

    try {
      await setDoc(newDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
      return newDocRef;

    } catch(error) {
      console.log('Error occurred creating user', error.message);
    }
  }
  return docRef;
}

export const createUserWithEP = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);