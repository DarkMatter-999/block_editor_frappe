import { registerCoreBlocks } from "@wordpress/block-library";
import { addFilter } from "@wordpress/hooks";

let initialized = false;

export function initEditor() {
  if (initialized) return;
  initialized = true;

  // Patch every registered block to enable alignment support.
  // In a standalone editor WP won't inject theme.json, so `align` support
  // defaults to false for most blocks.
  addFilter(
    "blocks.registerBlockType",
    "frappe-editor/enable-alignments",
    (settings: Record<string, unknown>, name: string) => {
      const skipList = ["core/html"];
      if (skipList.includes(name)) return settings;

      const supports = (settings.supports ?? {}) as Record<string, unknown>;

      return {
        ...settings,
        supports: {
          ...supports,
          align: supports.align ?? ["left", "center", "right", "wide", "full"],
          typography: {
            fontSize: true,
            lineHeight: true,
            ...(typeof supports.typography === "object"
              ? (supports.typography as object)
              : {}),
          },
          color: {
            text: true,
            background: true,
            link: true,
            ...(typeof supports.color === "object"
              ? (supports.color as object)
              : {}),
          },
        },
      };
    },
  );

  // Register all core blocks
  registerCoreBlocks();
}
