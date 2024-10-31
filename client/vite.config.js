import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Binds to all network interfaces
    port: 5173,      // Ensure the port matches your app’s default port
  },
  plugins: [react()],
})
