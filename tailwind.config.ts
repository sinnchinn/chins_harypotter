import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'harryBg': 'url(../assets/harrybg.jpg)'
      },
    },
    fontFamily: {
      buttonFont: ['buttonFont'],
      bodyFont: ['bodyFont']
    },
    colors: {
      'whiteBg': 'rgba(255, 255, 255, 0.5)',
      'greenBg': 'rgba(26,71,42)',
      'goldBg': 'rgb(195,154,28)',
      'hoverBtn': 'rgb(20, 56, 33)'
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
