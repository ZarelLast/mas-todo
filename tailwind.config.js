/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/views/**/*.vue',
        './src/views/*.vue',
        './src/components/*.vue',
        './src/components/**/*.vue',
        './src/views/*.vue',
        './src/views/**/*.vue',
        './src/layouts/*.vue',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            fontSize: {
                'Heading-1': ['40px', '48px'],
                'Heading-2': ['32px', '38.4px'],
                'Title-1': ['26px', '31.2px'],
                'Title-2': ['20px', '24px'],
                'Sub-Title-1': ['28px', {
                    lineHeight: '28px',
                    letterSpacing: '-0.6px'
                }],
                'Sub-Title-2': ['24px', {
                    lineHeight: '24px',
                    letterSpacing: '-0.2px'
                }],
                'Sub-Title-3': ['21px',{
                    lineHeight: '21px',
                    letterSpacing: '-0.4px'
                }],
                'Body-1': ['18px',{
                    lineHeight: '21.6px',
                    letterSpacing: '-0.4px'
                }],
                'Body-2': ['16px', {
                    lineHeight: '22.4px',
                    letterSpacing: '-0.3px'
                }],
                'Body-3': ['14px', {
                    lineHeight: '22.4px',
                    letterSpacing: '-0.3px'
                }],
                'Body-4': ['12px',{
                    lineHeight: '19.2px',
                    letterSpacing: '-0.2px'
                }]
            },
            fontWeight: {
                Reguler: 400,
                Medium: 500,
                Semibold: 600,
                Bold: 700
            },
            colors: {
                brand: {
                    light: '#e6f2ff',
                    lightHover: '#d9ecff',
                    lightActive: '#b0d7fe',
                    normal: '#007dfc',
                    normalHover: '#0071e3',
                    normalActive: '#0064ca',
                    dark: '#005ebd',
                    darkHover: '#004b97',
                    darkActive: '#003871',
                    darker: '#002c58'
                },
                base: {
                    BackgroudDark: '#131313',
                    Black: '#303030',
                    Grey: '#CCCCCC',
                    Section: '#F0F3FF',
                    BackgroundLight: '#F9FBFE',
                    White: '#FFFFFF'
                },
                border: {
                    light: '#EFEFEF',
                    default: '#303030',
                    hover: '#E0E0E0',
                    dark: '#DBDBDB',
                    disabled: '#F4F4F4'
                },
                Text: {
                    100: '#F4F4F4',
                    200: '#EAEAEA',
                    300: '#ACACAC',
                    400: '#6E6E6E',
                    500: '#303030',
                    600: '#222222',
                    700: '#131313',
                    800: '#1B0F12',
                    900: '#17090E'
                },
                W: {
                    100: '#FECECB',
                    200: '#FDB6B1',
                    300: '#FC948E',
                    400: '#FC8078',
                    500: '#FB6056',
                    600: '#E4574E',
                    700: '#B2443D',
                    800: '#8A352F',
                    900: '#692824'
                },
                A: {
                    100: '#FFEFC5',
                    200: '#FFE7A9',
                    300: '#FFDC82',
                    400: '#FFD56A',
                    500: '#FFCB45',
                    600: '#E8B93F',
                    700: '#B59031',
                    800: '#8C7026',
                    900: '#6B551D'
                },
                S: {
                    100: '#B2EBD8',
                    200: '#8CE1C5',
                    300: '#58D3AA',
                    400: '#38CA99',
                    500: '#06BD80',
                    600: '#05AC74',
                    700: '#04865B',
                    800: '#036846',
                    900: '#034F36'
                }
            }
        },
    },
    plugins: [],
};