import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Docker içinden dışarıya erişim için gerekli
    port: 3000,
    watch: {
      usePolling: true // Windows/Docker kullanırken canlı yenilemenin (hot-reload) çalışmasını sağlar
    }
  }
})