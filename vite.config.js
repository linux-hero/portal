import {defineConfig} from "vite";
import viteReact from "@vitejs/plugin-react";
import viteYaml from "@modyfi/vite-plugin-yaml";

export default defineConfig({
    plugins: [
        viteReact(),
        viteYaml()
    ],
    test: {
        globals: 'true',
        environment: 'jsdom',
        setupFiles: './tests/hooks/setup.tsx',
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            extension: ['ts', 'tsx']
        }
    }
})