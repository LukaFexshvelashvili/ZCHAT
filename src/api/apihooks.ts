import {
  and,
  collection,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./apifunctions";
import { auth } from "./firebase";

export const listenLastMessages = (
  getLastMessages: Function,
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
        orderBy("sendTime", "desc"),
        limit(1)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (initialLoad) {
          initialLoad = false;
          return;
        }
        getLastMessages({
          sender: snapshot.docs[0]?.data().uId,
          text: snapshot.docs[0]?.data().text,
          seen: snapshot.docs[0]?.data().seen,
        });
        initialLoad = true;
      });
      return unsubscribe;
    }
  }, []);
};

export const getCharData = async (uID: string) => {
  const q = query(collection(db, "accounts"), where("uId", "==", uID));
  try {
    const data = await getDocs(q);
    return data.docs[0].data();
  } catch (error) {
    console.log(error);
  }
};
