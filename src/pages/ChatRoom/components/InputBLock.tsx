import { SendIcon } from "../../../icons/icons";

export default function InputBLock() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("submited");
  };
  return (
    <div className=" absolute bottom-0 w-full left-0 px-9 h-[100px]">
      <form
        className="flex justify-center items-center w-full h-full gap-[20px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="  w-[100%] h-11">
          <input
            className="h-full w-full px-5 bg-inputBg placeholder:text-inputPlaceholder rounded-lg border-2 border-inputBorder outline-none transition-colors focus:bg-inputBgFocus"
            type="text"
            placeholder="message..."
          />
        </div>
        <button className="h-11 min-h-11 aspect-square cursor-pointer transition-colors bg-main rounded-lg flex items-center justify-center hover:bg-mainHover">
          <SendIcon className=" h-[22px] aspect-square" />
        </button>
      </form>
    </div>
  );
}
