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
    if (chatTo) {
      const q = query(
        collection(db, "messages"),

        or(
          and(
            where("uId", "==", chatTo),
            where("chatTo", "==", auth.currentUser?.uid)
          ),
          and(
            where("uId", "==", auth.currentUser?.uid),
            where("chatTo", "==", chatTo)
          )
        ),
        orderBy("sendTime", "desc"),
        limit(1)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        getLastMessages({
          sender: snapshot.docs[0]?.data().uId,
          text: snapshot.docs[0]?.data().text,
          seen: snapshot.docs[0]?.data().seen,
        });
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
