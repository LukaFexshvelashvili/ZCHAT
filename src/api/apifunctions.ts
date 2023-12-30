import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  and,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import notificationSound from "../assets/sounds/notification.wav";
import { auth, app } from "./firebase";
import { useEffect } from "react";
export const db = getFirestore(app);

export const getChats = async (setAccounts: Function) => {
  const q = query(collection(db, "accounts"), orderBy("created"));
  const accountsQuery = await getDocs(q);
  setAccounts(accountsQuery.docs);
};

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
export const fetchMessages = async (
  getUpdatedMessages: Function,
  effect: Function,
  chatTo: string
) => {
  useEffect(() => {
    let initialLoad = true;
    if (chatTo && auth.currentUser?.uid) {
      const uID = auth.currentUser?.uid;
      const q = query(
        collection(db, "messages"),
        where("chatTo", "in", [chatTo, uID]),
        where("uId", "in", [chatTo, uID]),
        orderBy("sendTime")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (initialLoad) {
          initialLoad = false;
          return;
        }

        getUpdatedMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        initialLoad = true;
      });
      return unsubscribe;
    }
  }, [chatTo]);
  effect();
};

export const listenMessages = () => {
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatTo", "==", auth.currentUser?.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (
        !isWindowFocused &&
        snapshot.docs[snapshot.docs.length - 1].data().uId !==
          auth.currentUser?.uid
      ) {
        new Audio(notificationSound).play();
        notifyCount++;
        document.title = `(${notifyCount}) New Message${
          notifyCount > 1 ? "s" : ""
        }`;
      }
    });

    return unsubscribe;
  }, []);
};

export const sendMessage = async (
  user: any,
  message: string,
  messageTo: string
) => {
  await addDoc(collection(db, "messages"), {
    uId: user.uid,
    uImage: user.photoURL,
    text: message,
    chatTo: messageTo,
    seen: false,
    sendTime: serverTimestamp(),
  });
};

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    if (result) {
      CheckLogin(result);
    }
  } catch (error) {
    console.log(error);
  }
};

async function CheckLogin(result: any) {
  const q = query(
    collection(db, "accounts"),
    where("uId", "==", result.user.uid)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, "accounts"), {
      uName: result.user.displayName,
      uImage: result.user.photoURL,
      uId: result.user.uid,
      active: true,
      lastActive: serverTimestamp(),
      created: serverTimestamp(),
    });
  }
}

export const setSeen = async (chatTo: string) => {
  if (isWindowFocused) {
    const messagesCollection = collection(db, "messages");

    const q = query(
      messagesCollection,
      where("seen", "==", false),
      where("uId", "==", chatTo),
      where("chatTo", "==", auth.currentUser?.uid)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (snap) => {
      const messageDocRef = doc(messagesCollection, snap.id);
      await updateDoc(messageDocRef, { seen: true, notified: true });
    });
  }
};
