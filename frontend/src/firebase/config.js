
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDkzT69-_kBs93ALupqlFTVNU5XdV9TW0g",
  authDomain: "college-management-7cd78.firebaseapp.com",
  projectId: "college-management-7cd78",
  storageBucket: "college-management-7cd78.appspot.com",
  messagingSenderId: "488422625986",
  appId: "1:488422625986:web:2fbe0b3e1f38ff32c9215b",
  measurementId: "G-M79P7X4BCF"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

