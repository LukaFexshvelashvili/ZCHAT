import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-chat-50224.firebaseapp.com",
  projectId: "react-chat-50224",
  storageBucket: "react-chat-50224.appspot.com",
  messagingSenderId: "680617257947",
  appId: "1:680617257947:web:092488e16368506a18d5fe",
  measurementId: "G-N51D6KZNGY",
});
const auth = getAuth(app);
export const storage = getStorage(app);
export { auth, app };
