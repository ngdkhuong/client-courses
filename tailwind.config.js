/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
        },
        extend: {
            scrollbar: ['rounded'],
            padding: {
                custom: '20px', // Replace '20px' with your desired padding value
            },
            colors: {
                customBlue: '#0C1326',
                customFontColorBlack: '#2A3B4F',
                customBlueShade: '#F3F7FE',
                hoverBlue: '#D4E4FC',
                customTextColor: '#2A3B4F',
                skyBlueCustom: '#F3F7FE',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
