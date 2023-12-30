import { useContext, useRef } from "react";
import Dialog from "./Dialog";
import InputBLock from "./InputBLock";
import { userContext } from "../../../App";
import SelectChat from "./assets/SelectChat";
import Loader from "../../../components/Loader";

export default function Chat(props: {
  chatLoader: boolean;
  setChatLoader: Function;
}) {
  const dialogBox = useRef<HTMLDivElement | null>(null);
  const User = useContext(userContext);
  return (
    <div className="w-8/12 relative h-full px-4 overflow-hidden flex flex-col">
      <Loader show={props.chatLoader} forBlock={true} className="z-10  bg-bg" />

      {User.activeChat ? (
        <>
          <Dialog dialogBox={dialogBox} setChatLoader={props.setChatLoader} />
          <InputBLock dialogBox={dialogBox} />
        </>
      ) : (
        <SelectChat />
      )}
    </div>
  );
}
