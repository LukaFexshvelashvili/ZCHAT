export default function Loader(props: {
  show: boolean;
  forBlock?: boolean;
  className?: string;
}) {
  return (
    <>
      {props.forBlock ? (
        <div
          className={` transition-opacity  h-full w-full absolute top-0 left-0 flex items-center justify-center ${
            props.className
          } ${props.show ? "opacity-100 visible" : "opacity-0 hidden"}`}
        >
          <div
            className={` h-[100px] aspect-square rounded-full  ${
              props.show ? "geC" : "hidden"
            } `}
          ></div>
        </div>
      ) : (
        <div
          className={` transition-[opacity,_visibility] duration-300 h-full w-full fixed flex items-center justify-center bg-neutral-950 z-50 ${
            props.show ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`transition-[opacity,_visibility] duration-300 h-[120px] aspect-square rounded-full  ${
              props.show
                ? "geC opacity-100  visible"
                : "geCLast opacity-0 invisible"
            }`}
          ></div>
        </div>
      )}
    </>
  );
}
