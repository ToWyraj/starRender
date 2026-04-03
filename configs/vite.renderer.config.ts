import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  assetsInclude: ["src/assets/*"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@core": path.resolve(__dirname, "../src/core"),
      "@sandbox": path.resolve(__dirname, "../src/sandbox"),
      "@aurora": path.resolve(__dirname, "../src/core/aurora"),
    },
  },
});
