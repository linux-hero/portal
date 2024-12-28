import {defineConfig} from "vite";
import viteReact from "@vitejs/plugin-react";
import viteYaml from "@modyfi/vite-plugin-yaml";

const viteServerConfig = () => ({
    name: "add-headers",
    configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            next();
        });
    },
});

export default defineConfig({
    plugins: [
        viteReact(),
        viteYaml(),
        viteServerConfig()
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
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2022"
        }
    }
});