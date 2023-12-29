import Navbar from "../../components/Navbar";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

export default function ChatRoom() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <ChatList />
      <Chat />
    </div>
  );
}
