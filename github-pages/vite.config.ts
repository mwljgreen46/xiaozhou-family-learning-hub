import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname),
  base: "/xiaozhou-family-learning-hub/",
  publicDir: resolve(__dirname, "../public"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "../pages-dist"),
    emptyOutDir: true,
  },
});
