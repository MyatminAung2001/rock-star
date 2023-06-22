/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "1rem",
                "2xl": "6rem",
            },
        },
        extend: {
            fontSize: {
                tiny: "0.7rem",
                sm: "0.9rem",
                base: "1rem",
                md: "1.2rem",
                xl: "1.4rem",
                "2xl": "1.6rem",
                heading: "1.5rem",
                "sub-heading": "1.25rem",
            },
            textColor: {
                "primary-white": "#FFFFFF",
                "primary-gray": "#B7B5B3",
                "primary-red": "#B80C09",
                "primary-brown": "#6B2B06",
                "primary-black": "#000814",
                "primary-yellow": "#ffb703",
                "secondary-gray": "#797979",
                "secondary-white": "#EEEEEE",
                "secondary-black": "#2d2c2c",
            },
            colors: {
                "primary-bg-black": "#000814",
                "primary-bg-white": "#FFFFFF",
                "primary-bg-gray": "#797979",
                "primary-bg-yellow": "#ffb703",
                "secondary-bg-black": "#202020",
                "secondary-bg-gray": "#2d2c2c",
                "card-bg-color": "#212529",
            },
            animation: {
                skeleton: "skeleton 1s infinite steps(10, end) alternate",
            },
            keyframes: {
                skeleton: {
                    "0%": { opacity: 0.25 },
                    "100%": { opacity: 1 },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
