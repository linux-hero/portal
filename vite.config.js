import {defineConfig} from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [viteReact()],
    test: {
        globals: 'true',
        environment: 'jsdom',
        setupFiles: './tests/hooks/setup.tsx'
    }
})