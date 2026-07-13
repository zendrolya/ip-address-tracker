import { defineConfig } from "vite";

export default defineConfig({
  base: "/ip-address-tracker/",
  root: "src",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ["maplibre-gl"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["maplibre-gl"],
  },
});
