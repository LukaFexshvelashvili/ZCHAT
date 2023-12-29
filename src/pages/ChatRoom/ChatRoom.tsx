import { listenMessages } from "../../api/apifunctions";
import Navbar from "../../components/Navbar";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

export default function ChatRoom() {
  listenMessages();
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <ChatList />
      <Chat />
    </div>
  );
}
