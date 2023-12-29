import { useContext, useRef } from "react";
import Dialog from "./Dialog";
import InputBLock from "./InputBLock";
import { userContext } from "../../../App";
import SelectChat from "./assets/SelectChat";

export default function Chat() {
  const dialogBox = useRef<HTMLDivElement | null>(null);
  const User = useContext(userContext);
  return (
    <div className="w-8/12 relative h-full px-4 overflow-hidden flex flex-col">
      {User.activeChat ? (
        <>
          <Dialog dialogBox={dialogBox} />
          <InputBLock dialogBox={dialogBox} />
        </>
      ) : (
        <SelectChat />
      )}
    </div>
  );
}
