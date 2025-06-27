import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer' 
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
     visualizer({
      filename: './dist/stats.html',
      open: true, // auto opens in browser
    }),
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
