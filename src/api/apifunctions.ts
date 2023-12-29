import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(app);

import { auth, app } from "./firebase";
import { useEffect, useState } from "react";
// const [newMessage, setNewMessage] = useState<string>("");

//

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
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

//  FETCH MESSAGES

//   {messages.map((msg: any, i: number) => (
//     <div key={i} className="">
//       {msg.data.text}
//     </div>
//   ))}

// INPUT

//  <input
//     type="text"
//     value={newMessage}
//     onChange={(e) => setNewMessage(e.target.value)}
//   />

// LOGOUT

// <button onClick={() => auth.signOut()}>log out</button>
