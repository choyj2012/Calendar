import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        stream: "stream-browserify",
      },
    },
  };

  if (command !== "serve") {
    config.base = "/Calendar/";
  }

  return config;
});