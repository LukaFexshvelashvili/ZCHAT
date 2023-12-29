import { UserIcon } from "../../../../icons/icons";

export default function DialogStarter() {
  return (
    <div className="mb-10">
      <div className="flex items-center my-6 gap-4 ">
        <div className=" z-[3] top-0 left-0 profileIcon bg-gradient-to-br from-[#1C25FF] to-[#7000FF] h-[80px] aspect-square rounded-3xl  flex justify-center items-center ">
          <UserIcon className=" h-[50px] aspect-square" />
        </div>
        <div className="flex flex-col">
          <p className="text-xl  text-nameText">Nick</p>
          <p className="text-lg text-subText">Jordan</p>
        </div>
      </div>
      <div className="w-full h-1 bg-buttonBg rounded-md"></div>
    </div>
  );
}
