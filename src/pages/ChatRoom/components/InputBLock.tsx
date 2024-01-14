import { useContext, useState } from "react";
import { CloseIcon, ImageIcon, SendIcon } from "../../../icons/icons";
import { sendMessage } from "../../../api/apifunctions";
import { userContext } from "../../../App";
import { auth } from "../../../api/firebase";
import { uploadImage } from "../../../api/apihooks";

export default function InputBLock(props: {
  dialogBox: any;
  reply: any;
  setReply: Function;
}) {
  const User = useContext(userContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showUploader, setShowUploader] = useState(false);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image == null) {
      if (message !== "" && message.replace(/\s+/g, "").length !== 0) {
        sendMessage(
          User.user,
          message,
          User.activeChat,
          props.reply.replyText ? props.reply : false,
          false
        );
        setMessage("");
        setImage(null);

        props.setReply({ replyTo: null, replyText: null, replyToName: null });
        if (props.dialogBox.current) {
          props.dialogBox.current.scrollBy(0, 999);
        }
      }
    } else {
      uploadImage(
        image,
        User.user,
        message,
        User.activeChat,
        props.reply.replyText ? props.reply : false
      );
      setMessage("");
      setImage(null);
      props.setReply({ replyTo: null, replyText: null, replyToName: null });
      setShowUploader(false);
      setSelectedImage(null);
      props.dialogBox.current.scrollBy(0, 999);
    }
  };
  const closeReply = () => {
    props.setReply({ replyTo: null, replyText: null, replyToName: null });
  };
  return (
    <div className="w-full h-[100px] px-4 pt-3">
      <form
        className="flex justify-center items-center w-full h-full gap-[20px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="  w-[100%] h-11 relative flex justify-center items-center">
          {props.reply.replyText ? (
            <div className="w-[calc(100%)] absolute h-8 border-t-2  border-l-2 border-r-2 border-inputBorder text-sm tracking-wider bg-inputBg rounded-t-lg bottom-[calc(100%)] flex items-center px-4">
              <span className=" text-replyToText pr-1">
                Reply{" "}
                {props.reply.replyTo !== auth.currentUser?.uid
                  ? props.reply.replyToName
                  : "You"}{" "}
                to :
              </span>
              <span className="text-myText">{props.reply.replyText}</span>
              <button
                type="button"
                onClick={closeReply}
                className="absolute right-2 bg-transparent h-4  aspect-square"
              >
                <CloseIcon className=" h-full aspect-square [&>path]:stroke-heartButton" />
              </button>
            </div>
          ) : null}

          <input
            className={`h-full w-full tracking-wide px-5 bg-inputBg placeholder:text-inputPlaceholder rounded-lg border-2 border-inputBorder outline-none transition-colors focus:bg-inputBgFocus ${
              props.reply.replyText ? "rounded-t-none" : ""
            }`}
            type="text"
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {showUploader ? (
            <div className="absolute bottom-[calc(100%+10px)] z-10 h-[300px] aspect-square bg-navBg rounded-3xl right-0 flex justify-center items-center p-4">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="max-w-full max-h-full p-4 object-cover absolute"
                />
              ) : null}
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => onImageChange(e)}
                className="h-full aspect-square absolute"
              />
              <div className="h-full aspect-square bg-bg rounded-3xl flex items-center justify-center flex-col text-xl tracking-wider text-nameText">
                <p>upload</p>
                <p>photo</p>
              </div>
            </div>
          ) : null}

          <button
            onClick={() => setShowUploader((state) => !state)}
            type="button"
            className="absolute right-4 cursor-pointer mobile:hidden"
          >
            <ImageIcon className="h-[24px] aspect-square" />
          </button>
          <button
            type="button"
            className="absolute right-4 cursor-pointer outMobile:hidden"
          >
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => onImageChange(e)}
              className="h-full aspect-square absolute left-0 top-0"
            />
            <ImageIcon className="h-[24px] aspect-square" />
          </button>
          {selectedImage ? (
            <div className=" absolute bottom-[calc(100%+10px)]  rounded-lg h-[100px] w-full aspect-square left-0 bg-[rgba(30,30,30,0.90)] flex items-center justify-between px-5 outMobile:hidden">
              <p className="text-sm text-subText">Selected Image:</p>
              <img
                src={selectedImage}
                className="max-w-full max-h-full object-cover  rounded-lg"
              />
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="h-11 min-h-11 aspect-square cursor-pointer transition-colors bg-main rounded-lg flex items-center justify-center hover:bg-mainHover"
        >
          <SendIcon className=" h-[22px] aspect-square" />
        </button>
      </form>
    </div>
  );
}
