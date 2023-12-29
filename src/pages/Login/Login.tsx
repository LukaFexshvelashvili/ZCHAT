import { handleGoogleLogin } from "../../api/apifunctions";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <button
        className="py-2 px-6 bg-buttonBgHover rounded-md border-2 border-red transition-colors hover:bg-buttonBg"
        onClick={handleGoogleLogin}
      >
        login
      </button>
    </div>
  );
}
