import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import BlockEditor from "./BlockEditor.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (element: HTMLElement) => Root;
  }
}

window.mountDMBlockEditor = (element) => {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <BlockEditor />
    </StrictMode>,
  );

  return root;
};
