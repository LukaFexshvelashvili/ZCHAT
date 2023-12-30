/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#151515",
        navBg: "#212121",
        listBg: "#1D1D1D",
        myTextBox: "#1D1D1D",
        inputBg: "rgba(25, 25, 25, 1)",
        inputBgFocus: "rgba(30, 30, 30, 1)",
        inputBorder: "rgba(56, 56, 56, 1)",
        main: "rgba(28, 160, 255, 1)",
        mainHover: "#45B1FF",
        icon: "rgba(255, 255, 255, 0.6)",
        inputPlaceholder: "rgba(255, 255, 255, 0.4)",
        red: "rgba(255, 0, 92, 1)",
        redBg: "rgba(255, 0, 92, 0.1)",
        buttonBg: "rgba(40, 40, 40, 1)",
        buttonHover: "#3D3D3D",
        chatBg: "rgba(38, 38, 38, 1)",
        chatActiveBg: "rgba(47, 47, 47, 1)",
        myText: "rgba(255, 255, 255, 0.6)",
        incomeText: "rgba(255, 255, 255, 1)",
        timeText: "rgba(255, 255, 255, 0.3)",
        userInfoBlock: "rgba(38, 38, 38, 1)",
        nameText: "rgba(255, 255, 255, 0.8)",
        subText: "rgba(255, 255, 255, 0.6)",
        startText: "rgba(155, 28, 255, 1)",
        startBg: "rgba(155, 28, 255, 0.1)",
        heartButton: "rgba(255, 255, 255, 0.20)",
        replyToText: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
