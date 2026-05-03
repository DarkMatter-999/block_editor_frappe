import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BlockEditor } from "./BlockEditor.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (
      element: HTMLElement,
      props: {
        content: string;
        title: string;
        route: string;
        published: number;
        meta_title: string;
        meta_description: string;
      },
      onChange: (content: string) => void,
      onClose: () => void,
      onSave: (
        title: string,
        rendered: string,
        route: string,
        published: number,
        meta_title: string,
        meta_description: string,
      ) => void,
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

  const { content, title, route, published, meta_title, meta_description } =
    props;

  const render = (newContent: string, newDocName: string) => {
    root?.render(
      <StrictMode>
        <BlockEditor
          key={newDocName}
          value={newContent}
          title={title}
          route={route}
          published={published}
          meta_title={meta_title}
          meta_description={meta_description}
          docName={newDocName}
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
