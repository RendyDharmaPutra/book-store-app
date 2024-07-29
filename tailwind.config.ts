import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#00a499",
				secondary: "#98ddcc",
				page: "#d3f1e9",
				danger: "#D9534F",
			},
		},
	},
	plugins: [],
} satisfies Config;
