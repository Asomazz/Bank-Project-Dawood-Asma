module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        drawLine1:
          "drawLine1 2.5s ease-in-out forwards, flicker1 4s linear 5s infinite",
        drawLine2:
          "drawLine2 2.5s ease-in-out .5s forwards, flicker2 4s linear 4.5s infinite",
        drawLine3:
          "drawLine3 2.5s ease-in-out 1s forwards, flicker3 4s linear 4s infinite",
        fadeInText:
          "fadeInText 3s ease-in 3.5s forwards, flicker4 5s linear 7.5s infinite, hueRotate 6s ease-in-out 3s infinite",
        hueRotate: "hueRotate 6s ease-in-out 3s infinite",
      },
      keyframes: {
        drawLine1: {
          "0%": { strokeDashoffset: "-940px" },
          "100%": { strokeDashoffset: "0px" },
        },
        drawLine2: {
          "0%": { strokeDashoffset: "-735px" },
          "100%": { strokeDashoffset: "0px" },
        },
        drawLine3: {
          "0%": { strokeDashoffset: "-940px" },
          "100%": { strokeDashoffset: "0px" },
        },
        flicker1: {
          "0%": { stroke: "#ff005d" },
          "1%": { stroke: "transparent" },
          "3%": { stroke: "transparent" },
          "4%": { stroke: "#ff005d" },
          "6%": { stroke: "#ff005d" },
          "7%": { stroke: "transparent" },
          "13%": { stroke: "transparent" },
          "14%": { stroke: "#ff005d" },
          "100%": { stroke: "#ff005d" },
        },
        flicker2: {
          "0%": { stroke: "#ff005d" },
          "50%": { stroke: "#ff005d" },
          "51%": { stroke: "transparent" },
          "61%": { stroke: "transparent" },
          "62%": { stroke: "#ff005d" },
          "100%": { stroke: "#ff005d" },
        },
        flicker3: {
          "0%": { stroke: "#ff005d" },
          "1%": { stroke: "transparent" },
          "10%": { stroke: "transparent" },
          "11%": { stroke: "#ff005d" },
          "40%": { stroke: "#ff005d" },
          "41%": { stroke: "transparent" },
          "45%": { stroke: "transparent" },
          "46%": { stroke: "#ff005d" },
          "100%": { stroke: "#ff005d" },
        },
        flicker4: {
          "0%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "30%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "31%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "32%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "36%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "37%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "41%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "42%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "85%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "86%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "95%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "96%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
          "100%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
        },
        hueRotate: {
          "0%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(-120deg)" },
          "100%": { filter: "hue-rotate(0deg)" },
        },
        fadeInText: {
          "1%": { color: "#12000a", textShadow: "0px 0px 4px #12000a" },
          "70%": { color: "#ff005d", textShadow: "0px 0px 14px #ff005d" },
          "100%": { color: "#ff005d", textShadow: "0px 0px 4px #ff005d" },
        },
      },
      colors: {
        primary: "#ff005d",
        secondary: "#12000a",
      },
      fontFamily: {
        audiowide: ["Audiowide", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
