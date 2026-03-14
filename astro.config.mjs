// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },
});
