import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yp1f86w8f0.execute-api.ap-south-1.amazonaws.com/dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
