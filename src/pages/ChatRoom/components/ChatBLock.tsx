import { UserIcon } from "../../../icons/icons";

export default function ChatBLock(props: {
  blockId: number;
  blockActive: number;
  setBlockActive: Function;
  groupChat?: boolean;
}) {
  return (
    <div
      onClick={() => props.setBlockActive(props.blockId)}
      className={`flex items-center px-5 py-8 rounded-3xl w-full h-[95px]  cursor-pointer transition-colors hover:bg-chatActiveBg ${
        props.blockActive === props.blockId ? "bg-chatActiveBg" : "bg-chatBg"
      }`}
    >
      {props.groupChat ? (
        <div className="flex items-center justify-center h-[60px] aspect-square relative">
          <div className=" z-[3] absolute top-0 left-0 profileIcon bg-gradient-to-br from-[#1C25FF] to-[#7000FF] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
          <div className=" z-[2] absolute profileIcon bg-gradient-to-br from-[#FFDB1C] to-[#FF3D00] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
          <div className=" z-[1] absolute  bottom-0 right-0 profileIcon bg-gradient-to-br from-[#FF1C1C] to-[#DB00FF] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
        </div>
      ) : (
        <div className="profileIcon bg-gradient-to-br from-[rgba(28,255,200,1)] to-[rgba(0,87,255,1)] h-[60px] aspect-square rounded-xl  flex justify-center items-center ">
          <UserIcon className=" h-[42px] aspect-square" />
        </div>
      )}
      <p className=" text-myText text-sm ml-5 tracking-wider mb-3 ">
        Lorem ipsum dolor sit eu bibendum.
      </p>
    </div>
  );
}
