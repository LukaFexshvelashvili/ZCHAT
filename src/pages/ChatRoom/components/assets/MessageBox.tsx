type TMessageBox = {
  own: boolean;
  time: string;
  text: string;
  seen: boolean;
  isLast: boolean;
};

export default function MessageBox({
  own,
  time,
  text,
  seen,
  isLast,
}: TMessageBox) {
  return own ? (
    <div className="flex items-center justify-end w-auto">
      <p className="text-sm text-timeText mx-3">
        {isLast
          ? time !== "Sending..."
            ? seen
              ? "seen"
              : "sent"
            : ""
          : null}{" "}
        {time}
      </p>
      <div className="px-3 py-2 bg-myTextBox rounded-xl text-myText">
        {text}
      </div>
    </div>
  ) : (
    <div className="flex items-center w-auto">
      <div className="px-3 py-2 text-white bg-main rounded-xl">{text}</div>
      <p className="text-sm text-timeText mx-3">{time}</p>
    </div>
  );
}
