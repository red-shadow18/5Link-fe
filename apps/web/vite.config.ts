import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000
  },
  resolve:{
    alias:{
      '@5link/shared':path.resolve(__dirname, '../../packages/shared/index.ts'),
    }
  }
})
