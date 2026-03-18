import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = `http://127.0.0.1:${env.GEMINI_PROXY_PORT || '8787'}`;

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': proxyTarget,
        '/health': proxyTarget,
      },
    },
    preview: {
      port: 4173,
      host: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  };
});
