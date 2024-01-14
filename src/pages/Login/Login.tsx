import { handleGoogleLogin } from "../../api/apifunctions";
import logoIcon from "../../assets/images/logo.png";
import rocketDecor from "../../assets/images/rocketDecor.webp";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-9">
      <img
        src={rocketDecor}
        alt="rocketDecoration"
        className="absolute bottom-10 z-0 left-10 h-[55%] imgNoDrag max-mobile:h-[30%]"
      />
      <img
        src={rocketDecor}
        alt="rocketDecoration"
        className="absolute top-10 z-0 right-10 h-[55%] imgNoDrag rotate-180 max-mobile:h-[30%]"
      />
      <a
        className="h-[50px] rounded-3xl aspect-square absolute top-9 left-9 cursor-pointer aNoDrag"
        href="/"
      >
        <img
          src={logoIcon}
          alt="logo"
          className="h-[50px] aspect-square imgNoDrag"
        />
      </a>
      <h2 className="text-white tracking-widest text-3xl font-medium z-10">
        Welcome to{" "}
        <span className="textGradient font-extrabold brightness-150">
          CHATZ
        </span>
      </h2>

      <button
        className="py-3 px-8 text-nameText bg-gradient-to-r tracking-widest from-linearFirst to-linearEnd rounded-md transition-all duration-200 z-10 hover:brightness-125"
        onClick={handleGoogleLogin}
      >
        Login With Google
      </button>
    </div>
  );
}
