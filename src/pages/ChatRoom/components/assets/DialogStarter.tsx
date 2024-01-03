import { useContext, useEffect, useState } from "react";
import { UserIcon } from "../../../../icons/icons";
import { userContext } from "../../../../App";
import { getCharData } from "../../../../api/apihooks";

export default function DialogStarter() {
  const [characterData, setCharacterData] = useState<any>();
  const User = useContext(userContext);
  useEffect(() => {
    getCharData(User.activeChat).then((querySnapshot) => {
      setCharacterData(querySnapshot);
    });
  }, [User.activeChat]);

  return (
    <div className="pt-4 sticky top-0 w-full left-0 bg-bg z-10">
      <div className="flex items-center my-4 gap-4 ">
        <div className=" z-[3] top-0 left-0 profileIcon overflow-hidden bg-gradient-to-br from-[#1C25FF] to-[#7000FF] h-[40px] aspect-square rounded-lg  flex justify-center items-center ">
          {characterData?.uImage ? (
            <img src={characterData?.uImage} alt="profileImage" />
          ) : (
            <UserIcon className=" h-[25px] aspect-square" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-lg tracking-wider  text-nameText">
            {characterData?.uName}
          </p>
        </div>
      </div>
      <div className="w-full h-1 bg-buttonBg rounded-md"></div>
    </div>
  );
}
