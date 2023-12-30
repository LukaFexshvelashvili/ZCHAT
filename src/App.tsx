import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Login from "./pages/Login/Login";
import Loader from "./components/Loader";
export const userContext = createContext<any>(null);

function App() {
  const [loaderShow, setLoaderShow] = useState<any>(true);

  const [user, setUser] = useState<any>(null);
  const [activeChat, setActiveChat] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      setLoaderShow(false);
    });
  });
  return (
    <userContext.Provider value={{ user, activeChat, setActiveChat }}>
      <Loader show={loaderShow} />
      {user ? <ChatRoom /> : <Login />}
    </userContext.Provider>
  );
}

export default App;
