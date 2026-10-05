import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// PORT, PREVIEW_PORT and HOST have no VITE_ prefix on purpose:
// they are read here, at config time, and never reach the browser bundle.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const host = env.HOST || true // true = listen on 0.0.0.0 so other devices and EC2 can reach it
  return {
    plugins: [react()],
    server: { port: Number(env.PORT) || 5173, host, strictPort: true },
    preview: { port: Number(env.PREVIEW_PORT) || 4173, host, strictPort: true }
  }
})
