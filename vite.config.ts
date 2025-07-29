import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
        proxy: {
            '/api': {
                changeOrigin: true,
                secure: true,
                target: 'https://forms-server.vercel.app/'
            }
        },
        strictPort: true
    },
    css: {
        postcss: {
            plugins: [autoprefixer]
        }
    }
});
