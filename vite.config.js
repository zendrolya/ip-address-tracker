import { defineConfig } from "vite";

export default defineConfig({
  base: "/ip-address-tracker/",

  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("maplibre-gl")) {
            return "maplibre";
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ["maplibre-gl"],
  },
});
