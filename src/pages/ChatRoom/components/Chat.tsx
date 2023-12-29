import { useRef } from "react";
import Dialog from "./Dialog";
import InputBLock from "./InputBLock";

export default function Chat() {
  const dialogBox = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-8/12 relative h-full px-4 overflow-hidden flex flex-col">
      <Dialog dialogBox={dialogBox} />
      <InputBLock dialogBox={dialogBox} />
    </div>
  );
}
