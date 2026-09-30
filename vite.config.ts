import { defineConfig } from "vite";
import path from "path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const publicBasePath = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : "/";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: publicBasePath,
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
});
