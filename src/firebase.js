import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSEXJ-Tg7lNDW5H67GFeQnbcpexJwiTLE",
  authDomain: "clone-237c7.firebaseapp.com",
  projectId: "clone-237c7",
  storageBucket: "clone-237c7.appspot.com",
  messagingSenderId: "174091326574",
  appId: "1:174091326574:web:f2c38ea0a9733172d7827f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
