import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Expose API_URL (in addition to the default VITE_ prefix) to client code.
  envPrefix: ['VITE_', 'API_URL'],
})
