import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '359px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      zIndex: {
        '9999': '9999'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sygnature-brown' : '#998373',
        'sygnature-beige' : '#F4F1EA'
      },
      width: {
        '88' : '20rem',
        '90' : '21rem',
        '92' : '22rem',
        '100' : '26rem',
        '104' : '28rem',
        '108' : '30rem',
        '112' : '32rem',
        '116' : '34rem',
        '120' : '36rem',
        '124' : '38rem',
        '128' : '40rem',
      },
      top: {
        '42' : '10.5rem'
      },
      translate: {
        '100' : '26rem',
        '104' : '28rem',
        '108' : '30rem',
        '112' : '32rem',
        '116' : '34rem',
        '120' : '36rem',
        '124' : '38rem',
        '128' : '40rem',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }
    },
  },
  plugins: [],
}
export default config
