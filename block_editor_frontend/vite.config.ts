import { defineConfig, build } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath } from "node:url";

const wpAlias = (pkg: string, file: string) => ({
  find: `@wordpress/${pkg}/build-style/${file}.css`,
  replacement: fileURLToPath(
    new URL(
      `./node_modules/@wordpress/${pkg}/build-style/${file}.css`,
      import.meta.url,
    ),
  ),
});

const cssAliases = [
  wpAlias("components", "style"),
  wpAlias("block-editor", "style"),
  wpAlias("block-editor", "content"),
  wpAlias("block-library", "common"),
  wpAlias("block-library", "reset"),
  wpAlias("block-library", "elements"),
  wpAlias("block-library", "style"),
  wpAlias("block-library", "editor"),
  wpAlias("block-library", "theme"),
  wpAlias("format-library", "style"),
];

function buildFrontendCssPlugin() {
  return {
    name: "build-frontend-css",
    async closeBundle() {
      // Recursion guard
      if (process.env.VITE_INTERNAL_BUILD === "true") return;
      process.env.VITE_INTERNAL_BUILD = "true";

      await build({
        configFile: false,
        plugins: [],
        resolve: {
          alias: Object.fromEntries(
            cssAliases.map((a) => [a.find, a.replacement]),
          ),
        },
        build: {
          outDir: "../block_editor_frappe/public",
          emptyOutDir: false,
          rollupOptions: {
            input: { block_editor_frontend: "src/scripts/frontendStyles.ts" },
            output: {
              assetFileNames: (info) =>
                info.name?.endsWith(".css")
                  ? "css/block_editor_frontend.bundle.css"
                  : "assets/[name][extname]",
              entryFileNames: "js/_unused_[name].bundle.js",
            },
          },
        },
      });

      delete process.env.VITE_INTERNAL_BUILD;
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({ plugins: [["babel-plugin-react-compiler", { target: "18" }]] }),
    buildFrontendCssPlugin(),
  ],
  resolve: {
    alias: Object.fromEntries(cssAliases.map((a) => [a.find, a.replacement])),
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
        assetFileNames: (info) =>
          info.name?.endsWith(".css")
            ? "css/block_editor_main.bundle.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
}));
