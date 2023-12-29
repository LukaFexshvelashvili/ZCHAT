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
  }, []);

  console.log(characterData);

  return (
    <div className="mb-10">
      <div className="flex items-center my-6 gap-4 ">
        <div className=" z-[3] top-0 left-0 profileIcon overflow-hidden bg-gradient-to-br from-[#1C25FF] to-[#7000FF] h-[80px] aspect-square rounded-3xl  flex justify-center items-center ">
          {characterData?.uImage ? (
            <img src={characterData?.uImage} alt="profileImage" />
          ) : (
            <UserIcon className=" h-[50px] aspect-square" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-xl  text-nameText">{characterData?.uName}</p>
        </div>
      </div>
      <div className="w-full h-1 bg-buttonBg rounded-md"></div>
    </div>
  );
}
