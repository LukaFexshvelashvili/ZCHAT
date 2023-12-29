import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import notificationSound from "../assets/sounds/notification.wav";
import { auth, app } from "./firebase";
import { useEffect } from "react";

const db = getFirestore(app);

let isWindowFocused = true;
let notifyCount = 0;
window.onblur = () => {
  isWindowFocused = false;
};
window.onfocus = () => {
  isWindowFocused = true;
  notifyCount = 0;
  document.title = `ZCHAT`;
};

const playSound = () => {
  new Audio(notificationSound).play();
};

export const listenMessages = (
  getUpdatedMessages: Function,
  effect: Function
) => {
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("sendTime"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      getUpdatedMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      if (isWindowFocused == false) {
        notifyCount++;
        playSound();
        document.title = `(${notifyCount}) New Message`;
      }
    });

    return unsubscribe;
  }, []);
  effect();
};

export const sendMessage = async (user: any, message: string) => {
  await addDoc(collection(db, "messages"), {
    uId: user.uid,
    uImage: user.photoURL,
    text: message,
    sendTime: serverTimestamp(),
  });
};

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
