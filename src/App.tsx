import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
export const userContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  return (
    <userContext.Provider value={user}>
      {user ? <ChatRoom /> : <Login />}
    </userContext.Provider>
  );
}

export default App;
