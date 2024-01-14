import { useContext, useEffect, useState } from "react";
import ChatBLock from "./ChatBLock";
import { PlusIcon } from "../../../icons/icons";
// import { getChats } from "../../../api/apifunctions";
import { userContext } from "../../../App";
import Loader from "../../../components/Loader";
import AddConversationBlock from "./assets/AddConversationBlock";
import { getFriendChats } from "../../../api/apifunctions";
import { Alert } from "../../../components/customs";

export default function ChatList(props: {
  setChatLoader: Function;
  setNavShow: Function;
  navShow: boolean;
}) {
  const [loaderShow, setLoaderShow] = useState<any>(true);
  const [addBlock, setAddBlock] = useState(false);

  const User = useContext(userContext);
  const [chats, setChats] = useState<null | string[]>(null);
  const [blockActive, setBlockActive] = useState("");
  const [alertId, setAlertId] = useState<any>(false);
  useEffect(() => {
    // getChats(setChats);
  }, []);

  getFriendChats(setChats);
  useEffect(() => {
    if (chats !== null) {
      setLoaderShow(false);
    }
  }, [chats]);
  const handleCopy = () => {
    navigator.clipboard.writeText(User.user.uid);
    setAlertId(
      <Alert duration={2000} type={3} text={"ID Copied !"} fun={setAlertId} />
    );
  };
  return (
    <>
      {alertId}
      {addBlock ? (
        <AddConversationBlock setChats={setChats} setAddBlock={setAddBlock} />
      ) : null}
      <div
        className={` min-h-full w-4/12 bg-listBg rounded-r-[35px]  py-9 pl-[200px] pr-[20px] relative overflow-hidden mobile:pl-[110px]  mobile:pr-[10px] mobile:fixed mobile:w-full mobile:min-h-full transition-[left] duration-500 mobile:z-20 mobile:rounded-none ${
          props.navShow ? "mobile:-left-0" : "mobile:w-0 mobile:-left-full"
        }`}
      >
        <button
          onClick={handleCopy}
          className=" bg-buttonBg py-4 w-full text-sm flex items-center rounded-xl px-8 hover:bg-buttonHover duration-100 cursor-pointer mb-10 mobile:px-2 mobile:mt-6"
        >
          Your ID : {User.user.uid}
        </button>
        <Loader
          show={loaderShow}
          forBlock={true}
          className="pl-[200px] z-10 pr-[20px] bg-listBg"
        />

        <h3 className=" text-2xl tracking-wider mb-5 mobile:text-lg">
          Conversations
        </h3>
        <div className="flex flex-col mb-8 gap-3">
          {chats?.map((e: any, i: number) => {
            const chatData = e.data();
            return chatData.uId !== User.user.uid ? (
              <ChatBLock
                key={i}
                blockActive={blockActive}
                setBlockActive={setBlockActive}
                setNavShow={props.setNavShow}
                name={chatData.uName}
                blockId={chatData.uId}
                blockImage={chatData.uImage}
                setChatLoader={props.setChatLoader}
              />
            ) : null;
          })}
        </div>
        {/* <h3 className=" text-2xl tracking-wider mb-5">Group Chats</h3> */}
        {/* <div className="flex flex-col mb-8 gap-3"> */}
        {/* {chats.map((e, i) => (
          <ChatBLock
            key={i}
            blockActive={blockActive}
            setBlockActive={setBlockActive}
            blockId={e.id}
            groupChat={true}
          />
        ))} */}
        {/* </div> */}
        <button
          onClick={() => setAddBlock(true)}
          className=" cursor-pointer bg-buttonBg transition-colors py-4 w-full flex items-center rounded-xl px-8 hover:bg-buttonHover"
        >
          <PlusIcon className="h-[26px] min-h-[26px] aspect-square mobile:min-h-[20px] mobile:h-[20px]" />
          <p className="w-full text-center mobile:text-sm">add conversation</p>
        </button>
      </div>
    </>
  );
}
