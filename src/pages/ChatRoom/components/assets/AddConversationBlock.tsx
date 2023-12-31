import { memo, useState } from "react";
import { CloseIcon } from "../../../../icons/icons";
import { addConversation } from "../../../../api/apihooks";
import { getFriendChats } from "../../../../api/apifunctions";
import { Alert } from "../../../../components/customs";

function AddConversationBlock(props: {
  setChats: Function;
  setAddBlock: Function;
}) {
  const [friendId, setFriendId] = useState("");
  const [isWaiting, setIsWaiting] = useState<any>(false);
  const [alertId, setAlertId] = useState<any>();
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (friendId.length > 5) {
      setIsWaiting(true);
      addConversation(friendId, setIsWaiting).then((data) => {
        if (data == 10) {
          props.setAddBlock(false);
          getFriendChats(props.setChats);
          setAlertId(
            <Alert
              duration={2000}
              type={3}
              text={"friend added !"}
              fun={setAlertId}
            />
          );
        } else if (data == 5) {
          setAlertId(
            <Alert
              duration={2000}
              type={1}
              text={"You already have this friend"}
              fun={setAlertId}
            />
          );
        } else if (data == 3) {
          setAlertId(
            <Alert
              duration={2000}
              type={2}
              text={"Its your id (put your friend id)"}
              fun={setAlertId}
            />
          );
        } else if (data == 2) {
          setAlertId(() => (
            <Alert
              duration={2000}
              type={1}
              text={"ID NOT FOUND"}
              fun={setAlertId}
            />
          ));
        }
      });
    } else {
      alert("Wrong ID");
    }
  };
  console.log(alertId);

  return (
    <>
      {alertId}
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
          {isWaiting ? (
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              disabled={true}
              className="w-full py-1 rounded-md tracking-wider text-lg bg-main transition-color duration-100 hover:bg-mainHover"
            >
              loading...
            </button>
          ) : (
            <button className="w-full py-1 rounded-md tracking-wider text-lg bg-main transition-color duration-100 hover:bg-mainHover">
              add
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default memo(AddConversationBlock);
