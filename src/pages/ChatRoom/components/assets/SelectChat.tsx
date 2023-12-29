import rocketImage from "../../../../assets/images/rocket.png";

export default function SelectChat() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img src={rocketImage} className="max-h-[300px]" alt="decorationRocket" />
      <div className=" bg-startBg py-3 px-5 rounded-2xl mt-8">
        <h1 className="text-3xl tracking-wider text-startText">
          Select chat to start conversation
        </h1>
      </div>
    </div>
  );
}
