import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
        if (snapshot.docs.length == 0) {
          getLastMessages({
            sender: "none",
            text: "",
            seen: true,
          });
          return;
        }

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
export const addConversation = async (uID: string) => {
  if (uID !== auth.currentUser?.uid) {
    const myDataFetch = query(
      collection(db, "accounts"),
      where("uId", "==", auth.currentUser?.uid),
      limit(1)
    );
    const myData = await getDocs(myDataFetch);
    let myFriendsList = myData.docs[0].data().friends;
    if (!myFriendsList.includes(uID)) {
      const q = query(collection(db, "accounts"), where("uId", "==", uID));
      const getData = await getDocs(q);
      if (!getData.empty) {
        const docRef = doc(db, "accounts", getData.docs[0].id);
        await updateDoc(docRef, {
          friends: [...getData.docs[0].data().friends, auth.currentUser?.uid],
        });
      } else {
        return 2;
      }
      const docRef = doc(db, "accounts", myData.docs[0].id);
      await updateDoc(docRef, {
        friends: [...myData.docs[0].data().friends, uID],
      });
      return 10;
    } else {
      return 5;
    }
  } else {
    return 3;
  }
};
