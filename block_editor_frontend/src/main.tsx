import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BlockEditor } from "./BlockEditor.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (
      element: HTMLElement,
      content: string,
      onChange: (content: string, rendered: string) => void,
      onClose: () => void,
      docName: string,
    ) => void;
  }
}

let root: Root | null = null;

window.mountDMBlockEditor = (
  element,
  content,
  onChange,
  onClose,
  docName = "",
) => {
  if (!root) {
    root = createRoot(element);
  }

  const render = (newContent: string, newDocName: string) => {
    root?.render(
      <StrictMode>
        <BlockEditor
          key={newDocName}
          value={newContent}
          onChange={onChange}
          onClose={onClose}
        />
      </StrictMode>,
    );
  };

  render(content, docName);

  return {
    update: render,
    unmount: () => {
      root?.unmount();
      root = null;
    },
  };
};
