import { useEffect, useState } from "react";

export function Alert(props: {
  duration: number;
  type: number;
  text: string;
  fun: Function;
}) {
  const [isVisible, setIsVisible] = useState(false);
  let alertBg = "bg-warning";
  switch (props.type) {
    case 1:
      alertBg = "bg-warning";
      break;
    case 2:
      alertBg = "bg-info";
      break;
    case 3:
      alertBg = "bg-success";
      break;
  }
  useEffect(() => {
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, props.duration);
    const timeoutId2 = setTimeout(() => {
      props.fun(<></>);
    }, props.duration + 300);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [props.duration]);

  return (
    <div
      className={`absolute top-3 right-3 ${alertBg} justify-center items-center py-3 px-8 rounded-xl tracking-wider transition-all duration-300 select-none z-30 opacity-0  ${
        isVisible ? "opShow" : ""
      }`}
    >
      {props.text}
    </div>
  );
}
