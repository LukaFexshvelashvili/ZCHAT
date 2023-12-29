import {
  AddFriendsIcon,
  FreindsIcon,
  LogoutIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "../icons/icons";

export default function Navbar() {
  return (
    <div className="min-h-full bg-navBg w-[150px] rounded-r-[35px] absolute left-0 shadow-[25px_0px_40px_0px_rgba(0,0,0,0.05)] z-30">
      <div className="flex flex-col items-center justify-between min-h-screen py-9 ">
        <div className="flex flex-col items-center gap-[25px]">
          <div className=" cursor-pointer profileIcon bg-gradient-to-br from-[rgba(28,255,200,1)] to-[rgba(0,87,255,1)] h-[60px] aspect-square rounded-xl  flex justify-center items-center ">
            <UserIcon className=" h-[42px] aspect-square" />
          </div>
          <button className="iconButton">
            <FreindsIcon className=" h-[33px] aspect-square" />
          </button>
          <button className="iconButton">
            <AddFriendsIcon className=" h-[33px] aspect-square" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-[25px]">
          <button className="iconButton">
            <SunIcon className=" h-[33px] aspect-square" />
          </button>
          <button className="iconButton">
            <SettingsIcon className=" h-[33px] aspect-square" />
          </button>
          <button className="iconButton">
            <LogoutIcon className=" h-[33px] aspect-square" />
          </button>
        </div>
      </div>
    </div>
  );
}
