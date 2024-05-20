import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '1110px',
      lg: '1440px',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      normal: '16px',
      lg: '18px',
      xlg: '24px',
    },
    fontFamily: {
      light: ['Pretendard-Light'],
      Regular: ['Pretendard-Regular'],
      SemiBold: ['Pretendard-SemiBold'],
      Bold: ['Pretendard-Bold'],
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0)' },
      },
      slideDown: {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(100%)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.2s forwards',
      fadeOut: 'fadeOut 0.2s forwards',
      slideUp: 'slideUp 0.4s forwards',
      slideDown: 'slideDown 0.4s forwards',
    },
    extend: {
      colors: {
        red_light_1: '#FFD5DD',
        yellow: '#FFC803',
        yellow_dark: '#C9A219',
        yellow_light_1: '#FFF4CD',
        yellow_light_2: '#FFE99A',
        yellow_light_3: '#FFDE68',
        orange: '#FF8B1F',
        orange_dark: '#D46D0E',
        orange_light_1: '#FFE8D2',
        orange_light_2: '#FFB979',
        orange_light_3: '#FFB979',
        blue: '#5E9FFF',
        blue_dark: '#1A68DB',
        blue_light_0: '#F2F7FF',
        blue_light_1: '#DFECFF',
        blue_light_2: '#AECEFF',
        blue_light_3: '#9EC5FF',
        navy: '#162F70',
        navy_dark: '#071E5D',
        navy_light_1: '#D0D5E2',
        navy_light_2: '#8A96B7',
        navy_light_3: '#5C6E9B',
        gray_dark_1: '#4E4F54',
        gray_dark_2: '#171717',
        gray: '#949499',
        gray_light_1: '#F9F9FB',
        gray_light_2: '#F4F4F4',
        gray_light_3: '#E1E2E3',
        bg_white: '#F9F8F8',
        white: '#FFFFFF',
      },
      zIndex: {
        '100': '100',
      },
      width: {
        'plan-top-bar-open': 'calc(100% - 270px)',
        'plan-top-bar-close': 'calc(100% - 88px)',
      },
    },
    boxShadow: {
      card: ' 2px 6px 50px 2px rgba(0, 0, 0, 0.05)',
    },
  },
  plugins: [],
};
export default config;
