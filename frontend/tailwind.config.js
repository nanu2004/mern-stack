/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: {
          400: "#C80F2E",
        },
        mainLightcolor: {
          200: "#E54746",
        },
        mainPrimarycolor: {
          100: "#EEF0F1",
        },
        mainAdditionalcolor: {
          150: "#FED03B",
        },
      },
    },
  },
  plugins: [],
};
