import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
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

// export const getChats = async (setAccounts: Function) => {
//   const q = query(collection(db, "accounts"), orderBy("created"));
//   const accountsQuery = await getDocs(q);
//   setAccounts(accountsQuery.docs);
// };
export const getFriendChats = async (setAccounts: Function) => {
  const myDataFetch = query(
    collection(db, "accounts"),
    where("uId", "==", auth.currentUser?.uid),
    limit(1)
  );
  const myData = await getDocs(myDataFetch);
  if (!myData.empty) {
    const q = query(
      collection(db, "accounts"),
      where(
        "uId",
        "in",
        myData.docs[0].data().friends.length == 0
          ? [""]
          : myData.docs[0].data().friends
      )
    );

    const accountsQuery = await getDocs(q);
    if (!accountsQuery.empty) {
      setAccounts(accountsQuery.docs);
    } else {
      setAccounts([]);
    }
  }
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
      getDocs(q).then((data) => {
        getUpdatedMessages(
          data.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length == 0) {
          getUpdatedMessages([]);
        }

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
      });
      return unsubscribe;
    }
  }, [chatTo]);
  effect();
};

export const fetchChats = async (getUpdatedChats: Function) => {
  useEffect(() => {
    const myDataFetch = query(
      collection(db, "accounts"),
      where("uId", "==", auth.currentUser?.uid),
      limit(1)
    );
    getDocs(myDataFetch).then((data) => {
      if (!data.empty) {
        const q = query(
          collection(db, "accounts"),
          where(
            "uId",
            "in",
            data.docs[0].data().friends.length == 0
              ? [""]
              : data.docs[0].data().friends
          )
        );
        const unsubscribe = onSnapshot(q, (snapshot) =>
          getUpdatedChats(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        return unsubscribe;
      }
    });
  }, []);
};

export const listenMessages = () => {
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatTo", "==", auth.currentUser?.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (
        snapshot.docs.length !== 0 &&
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
  messageTo: string,
  reply: any
) => {
  if (message !== "" && message.replace(/\s+/g, "").length !== 0) {
    await addDoc(collection(db, "messages"), {
      uId: user.uid,
      uImage: user.photoURL,
      uName: user.displayName,
      text: message,
      chatTo: messageTo,
      seen: false,
      reacted: false,
      reply: reply,
      sendTime: serverTimestamp(),
    });
  }
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
      friends: [],
      lastActive: serverTimestamp(),
      created: serverTimestamp(),
    });
  }
}

export const setSeen = async (chatTo: string) => {
  if (isWindowFocused && chatTo && auth.currentUser?.uid) {
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

export const giveReact = async (messageId: string) => {
  if (messageId) {
    const docRef = doc(db, "messages", messageId);

    await getDoc(docRef).then((data) => {
      let toChange = !data.data()?.reacted;
      updateDoc(docRef, {
        reacted: toChange,
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    });
  }
};
