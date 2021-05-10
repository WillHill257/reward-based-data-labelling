import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: [
    {
      find: '@',
      replacement: resolve(__dirname, 'src'),
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
      }
    }
  }
});
