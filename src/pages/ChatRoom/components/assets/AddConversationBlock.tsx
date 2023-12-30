import { useContext, useState } from "react";
import { CloseIcon } from "../../../../icons/icons";
import { addConversation } from "../../../../api/apihooks";
import { userContext } from "../../../../App";
import { getFriendChats } from "../../../../api/apifunctions";

export default function AddConversationBlock(props: {
  setChats: Function;
  setAddBlock: Function;
}) {
  const User = useContext(userContext);
  const [friendId, setFriendId] = useState("");
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (friendId.length > 5) {
      User.setLoaderShow(true);

      addConversation(friendId).then((data) => {
        User.setLoaderShow(false);

        if (data == 10) {
          props.setAddBlock(false);
          getFriendChats(props.setChats);
        } else if (data == 5) alert("You already have this friend !");
        else if (data == 3) alert("Its your id (put your friend id)");
        else if (data == 2) alert("ID NOT FOUND");
      });
    } else {
      alert("Wrong ID");
    }
  };

  return (
    <div className=" px-4 py-5 fixed  flex flex-col w-[600px] h-[300px] justify-center items-center min-h-[200px] min-w-[350px] shadow-2xl z-30 rounded-3xl bg-addBlock top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <button
        className="absolute top-6 right-6"
        onClick={() => props.setAddBlock(false)}
      >
        <CloseIcon className="h-8 aspect-square [&>path]:stroke-subText" />
      </button>
      <h2 className="text-2xl tracking-wider mb-6">add conversation</h2>
      <p className="text-subText tracking-wider mb-2">enter user ID</p>
      <form
        onSubmit={(e) => handleForm(e)}
        className="flex flex-col min-w-[250px] gap-7 w-[300px]"
      >
        <input
          type="text"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          className="outline-none bg-inputBg border-2 border-inputBorder rounded-lg h-9 px-2 tracking-wider"
        />
        <button className="w-full py-1 rounded-md tracking-wider text-lg bg-main transition-color duration-100 hover:bg-mainHover">
          add
        </button>
      </form>
    </div>
  );
}
