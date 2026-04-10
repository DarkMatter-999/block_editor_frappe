import { registerCoreBlocks } from "@wordpress/block-library";

let initialized = false;

export function initEditor() {
  if (!initialized) {
    registerCoreBlocks();
    initialized = true;
  }
}
