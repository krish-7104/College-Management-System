import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "rannumber-guess.firebaseapp.com",
  databaseURL: "https://rannumber-guess-default-rtdb.firebaseio.com",
  projectId: "rannumber-guess",
  storageBucket: "rannumber-guess.appspot.com",
  messagingSenderId: "949978109505",
  appId: "1:949978109505:web:4a09f6895b2b0458ec98c0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
