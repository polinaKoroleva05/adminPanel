import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: ['localhost'],
        port: 5173,
        proxy: {
            '/api': {
                changeOrigin: true,
                secure: false,
                target: 'http://localhost:4000'
            }
        },
        strictPort: true
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    css: {
        postcss: {
            plugins: [autoprefixer]
        }
    }
});
