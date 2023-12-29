import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import ChatRoom from "./pages/ChatRoom/ChatRoom";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  return (
    <>
      {/* {user ? <></> : <></>} */}
      <ChatRoom />
    </>
  );
}

export default App;
