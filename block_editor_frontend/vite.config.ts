import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { generateThemeCss } from "./src/utils/generateThemeCss";

function virtualWpThemePlugin(): Plugin {
  const virtualModuleId = "virtual:wp-theme.css";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "vite-plugin-wp-theme-generator",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return generateThemeCss();
      }
    },
  };
}

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

export default defineConfig(({ mode }) => {
  const isFrontend = process.env.BUILD_TARGET === "frontend";
  const isDev = mode === "development";

  return {
    plugins: [
      virtualWpThemePlugin(),
      react(),
      babel({ plugins: [["babel-plugin-react-compiler", { target: "18" }]] }),
    ],
    resolve: { alias: cssAliases },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    build: {
      outDir: "../block_editor_frappe/public/vite",
      emptyOutDir: false,
      cssCodeSplit: false,
      sourcemap: isDev ? "inline" : false,
      minify: isDev ? false : "esbuild",
      target: "esnext",
      rollupOptions: {
        input: isFrontend
          ? resolve(__dirname, "src/scripts/frontendStyles.ts")
          : resolve(__dirname, "src/main.tsx"),
        output: {
          entryFileNames: isFrontend
            ? "js/block_editor_frontend.js"
            : "js/block_editor_main.js",
          assetFileNames: isFrontend
            ? "css/block_editor_frontend.css"
            : "css/block_editor_main.css",
        },
      },
    },
  };
});
