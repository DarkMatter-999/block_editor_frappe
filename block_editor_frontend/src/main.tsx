import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BlockEditor } from "./BlockEditor.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (
      element: HTMLElement,
      props: { content: string; title: string },
      onChange: (content: string) => void,
      onClose: () => void,
      onSave: (title: string, rendered: string) => void,
      docName: string,
    ) => void;
  }
}

let root: Root | null = null;

window.mountDMBlockEditor = (
  element,
  props,
  onChange,
  onClose,
  onSave,
  docName = "",
) => {
  if (!root) {
    root = createRoot(element);
  }

  const { content, title } = props;

  const render = (newContent: string, newDocName: string) => {
    root?.render(
      <StrictMode>
        <BlockEditor
          key={newDocName}
          value={newContent}
          title={title}
          onChange={onChange}
          onClose={onClose}
          onSave={onSave}
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
