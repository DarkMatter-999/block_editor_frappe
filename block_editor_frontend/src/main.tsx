import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import App from "./App.tsx";

declare global {
  interface Window {
    mountDMBlockEditor: (element: HTMLElement) => Root;
  }
}

window.mountDMBlockEditor = (element) => {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  return root;
};
