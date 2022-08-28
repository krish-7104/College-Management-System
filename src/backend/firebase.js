import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: ",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
//Add Your Own Project Details Here Above
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
