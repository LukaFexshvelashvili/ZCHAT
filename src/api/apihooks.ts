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
import { db, sendMessage } from "./apifunctions";
import { auth, storage } from "./firebase";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
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
      getDocs(q).then((data) => {
        getLastMessages({
          sender: data.docs[0]?.data().uId,
          text: data.docs[0]?.data().text,
          seen: data.docs[0]?.data().seen,
        });
      });
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length == 0) {
          getLastMessages({
            sender: "none",
            text: "",
            seen: true,
          });
          return;
        }
        if (initialLoad) {
          initialLoad = false;
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
export const addConversation = async (uID: string, isWaiting: Function) => {
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
        isWaiting(false);

        return 2;
      }
      const docRef = doc(db, "accounts", myData.docs[0].id);
      await updateDoc(docRef, {
        friends: [...myData.docs[0].data().friends, uID],
      });
      isWaiting(false);

      return 10;
    } else {
      isWaiting(false);

      return 5;
    }
  } else {
    isWaiting(false);

    return 3;
  }
};

export const uploadImage = (
  image: any,
  user: any,
  message: string,
  messageTo: string,
  reply: any
) => {
  if (image) {
    let imageUrl = `images/${image.name + v4()}`;
    const imageRef = ref(storage, imageUrl);
    uploadBytes(imageRef, image).then((data) => {
      console.log(data);

      sendMessage(user, message, messageTo, reply, imageUrl);
    });
  }
};
