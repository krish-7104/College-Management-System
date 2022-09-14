import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "college-managment-system-krish.firebaseapp.com",
  projectId: "college-managment-system-krish",
  storageBucket: "college-managment-system-krish.appspot.com",
  messagingSenderId: "185930233705",
  appId: "1:185930233705:web:918e94f5fa437f2fc4aff8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
