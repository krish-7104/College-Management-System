import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp_XQxkjeXVIGsvo8SiEqp3gNe2H7bLqE",
  authDomain: "college-managment-system-krish.firebaseapp.com",
  projectId: "college-managment-system-krish",
  storageBucket: "college-managment-system-krish.appspot.com",
  messagingSenderId: "185930233705",
  appId: "1:185930233705:web:918e94f5fa437f2fc4aff8",
  measurementId: "G-WPEKB1E3YZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
