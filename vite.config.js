import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "./", // important for GitHub Pages (relative paths)
	plugins: [tailwindcss()],
	server: {
		port: 5174, // local dev server port
		open: true, // auto-open browser
	},
});
