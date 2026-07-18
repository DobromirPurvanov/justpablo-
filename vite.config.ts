import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Разделяме тежките анимационни библиотеки в отделен chunk, който се
    // кешира между навигациите и не блокира първоначалния parse на app кода.
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          vendor: ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
});
