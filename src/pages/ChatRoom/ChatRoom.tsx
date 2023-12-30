import { useState } from "react";
import { listenMessages } from "../../api/apifunctions";
import Navbar from "../../components/Navbar";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

export default function ChatRoom() {
  const [chatLoader, setChatLoader] = useState<any>(false);

  listenMessages();
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <ChatList setChatLoader={setChatLoader} />
      <Chat chatLoader={chatLoader} setChatLoader={setChatLoader} />
    </div>
  );
}
