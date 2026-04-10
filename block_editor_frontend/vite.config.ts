import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      babel({ plugins: [["babel-plugin-react-compiler", { target: "18" }]] }),
    ],
    resolve: {
      alias: {
        "@wordpress/components/build-style/style.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/components/build-style/style.css",
            import.meta.url,
          ),
        ),
        "@wordpress/block-editor/build-style/style.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/block-editor/build-style/style.css",
            import.meta.url,
          ),
        ),
        "@wordpress/block-library/build-style/style.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/block-library/build-style/style.css",
            import.meta.url,
          ),
        ),
        "@wordpress/block-library/build-style/editor.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/block-library/build-style/editor.css",
            import.meta.url,
          ),
        ),
        "@wordpress/block-library/build-style/theme.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/block-library/build-style/theme.css",
            import.meta.url,
          ),
        ),
        "@wordpress/format-library/build-style/style.css": fileURLToPath(
          new URL(
            "./node_modules/@wordpress/format-library/build-style/style.css",
            import.meta.url,
          ),
        ),
      },
    },
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
