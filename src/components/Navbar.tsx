import {
  AddFriendsIcon,
  FreindsIcon,
  LogoutIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "../icons/icons";
import { auth } from "../api/firebase";
import { useContext } from "react";
import { userContext } from "../App";

export default function Navbar(props: { navShow: boolean }) {
  const User = useContext(userContext);

  return (
    <div
      className={`min-h-full bg-navBg w-[150px] rounded-r-[35px] fixed left-0 shadow-[25px_0px_40px_0px_rgba(0,0,0,0.05)] z-30 transition-[left] duration-300 mobile:w-[100px] mobile:rounded-r-[20px] ${
        props.navShow ? "mobile:left-0" : "mobile:-left-full "
      }`}
    >
      <div className="flex flex-col items-center justify-between min-h-screen py-9 mobile:py-15">
        <div className="flex flex-col items-center gap-[25px]">
          <div className=" overflow-hidden cursor-pointer profileIcon bg-gradient-to-br from-[rgba(28,255,200,1)] to-[rgba(0,87,255,1)] h-[60px] aspect-square rounded-xl  flex justify-center items-center ">
            {User ? (
              <img src={User.user?.photoURL} alt="userImage" />
            ) : (
              <UserIcon className=" h-[42px] aspect-square mobile:h-14" />
            )}
          </div>
          <button className="iconButton mobile:h-14">
            <FreindsIcon className=" h-[33px] mobile:h-7 aspect-square" />
          </button>
          <button className="iconButton mobile:h-14">
            <AddFriendsIcon className=" h-[33px] mobile:h-7 aspect-square" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-[25px]">
          <button className="iconButton mobile:h-14">
            <SunIcon className=" h-[33px] mobile:h-7 aspect-square" />
          </button>
          <button className="iconButton mobile:h-14">
            <SettingsIcon className=" h-[33px] mobile:h-7 aspect-square" />
          </button>
          <button
            className="iconButton mobile:h-14"
            onClick={() => auth.signOut()}
          >
            <LogoutIcon className=" h-[33px] mobile:h-7 aspect-square" />
          </button>
        </div>
      </div>
    </div>
  );
}
