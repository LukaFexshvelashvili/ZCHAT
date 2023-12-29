import { useContext, useState } from "react";
import { SendIcon } from "../../../icons/icons";
import { sendMessage } from "../../../api/apifunctions";
import { userContext } from "../../../App";

export default function InputBLock(props: { dialogBox: any }) {
  const User = useContext(userContext);
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(User, message);
    setMessage("");
    if (props.dialogBox.current) {
      props.dialogBox.current.scrollBy(0, 999);
    }
  };
  return (
    <div className="w-full h-[100px] px-4">
      <form
        className="flex justify-center items-center w-full h-full gap-[20px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="  w-[100%] h-11">
          <input
            className="h-full w-full px-5 bg-inputBg placeholder:text-inputPlaceholder rounded-lg border-2 border-inputBorder outline-none transition-colors focus:bg-inputBgFocus"
            type="text"
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className="h-11 min-h-11 aspect-square cursor-pointer transition-colors bg-main rounded-lg flex items-center justify-center hover:bg-mainHover">
          <SendIcon className=" h-[22px] aspect-square" />
        </button>
      </form>
    </div>
  );
}
