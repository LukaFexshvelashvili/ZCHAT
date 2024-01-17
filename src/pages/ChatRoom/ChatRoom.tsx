import { useState } from "react";
import { listenMessages } from "../../api/apifunctions";
import Navbar from "../../components/Navbar";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

export default function ChatRoom() {
  const [chatLoader, setChatLoader] = useState<boolean>(false);
  const [navShow, setNavShow] = useState<boolean>(false);

  listenMessages();
  return (
    <div className="flex min-h-screen">
      <div
        onClick={() => setNavShow((state: boolean) => !state)}
        className="fixed top-7 right-5 z-40 h-12 aspect-square rounded-2xl  p-2 flex items-center justify-center flex-col gap-[6px] outMobile:hidden"
      >
        <span
          className={`lineBurg transition-transform ${
            navShow ? " translate-y-[8px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`lineBurg transition-opacity ${
            navShow ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`lineBurg transition-transform ${
            navShow ? "-translate-y-[8px] -rotate-45" : ""
          }`}
        ></span>
      </div>
      <Navbar navShow={navShow} />
      <ChatList
        setChatLoader={setChatLoader}
        navShow={navShow}
        setNavShow={setNavShow}
      />
      <Chat chatLoader={chatLoader} setChatLoader={setChatLoader} />
    </div>
  );
}
