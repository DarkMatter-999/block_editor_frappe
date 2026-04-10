import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BlockEditor } from "./BlockEditor.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (
      element: HTMLElement,
      initialContent: string,
      onChange: (content: string) => void,
      onClose: () => void,
    ) => Root;
  }
}

window.mountDMBlockEditor = (element, initialContent, onChange, onClose) => {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <BlockEditor
        value={initialContent}
        onChange={onChange}
        onClose={onClose}
      />
    </StrictMode>,
  );

  return root;
};
