import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatz-717aa.firebaseapp.com",
  projectId: "chatz-717aa",
  storageBucket: "chatz-717aa.appspot.com",
  messagingSenderId: "1079048861412",
  appId: "1:1079048861412:web:300d8cc0b874b0f0621ef1",
  measurementId: "G-SCDQGKKZCF",
});
const auth = getAuth(app);

export { auth, app };
