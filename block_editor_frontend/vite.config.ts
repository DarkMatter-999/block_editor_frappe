import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode);
  return {
    plugins: [
      react(),
      babel({ plugins: [["babel-plugin-react-compiler", { target: "18" }]] }),
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env": {},
    },
    build: {
      outDir: "../block_editor_frappe/public",
      emptyOutDir: false,
      lib: {
        entry: "src/main.tsx",
        name: "BlockEditor",
        formats: ["iife"],
        fileName: () => `js/block_editor_main.bundle.js`,
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return `css/block_editor_main.bundle.css`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  };
});
