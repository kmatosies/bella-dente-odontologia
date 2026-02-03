import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true
    },
    preview: {
      port: 4173,
      host: true
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    // Se você AINDA tiver código antigo usando process.env, mantém isso:
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY ?? ""),
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY ?? "")
    }
  };
});
