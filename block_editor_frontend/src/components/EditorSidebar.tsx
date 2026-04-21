import { useSelect } from "@wordpress/data";
import {
  store as blockEditorStore,
  BlockInspector,
} from "@wordpress/block-editor";
import { useLayoutEffect, useRef } from "@wordpress/element";
import { CloseButton } from "./CloseButton";

type RightPanel = "page" | "block";

interface EditorSidebarProps {
  rightPanel: RightPanel;
  setRightPanel: (panel: RightPanel) => void;
  showRight: boolean;
  setShowRight: (show: boolean | ((prev: boolean) => boolean)) => void;
  settings: {
    title: string;
    route: string;
    published: number;
    meta_title: string;
    meta_description: string;
  };
  setSettings: React.Dispatch<
    React.SetStateAction<{
      title: string;
      route: string;
      published: number;
      meta_title: string;
      meta_description: string;
    }>
  >;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsDirty: (isDirty: boolean) => void;
  initialSettings: {
    title: string;
    route: string;
    published: number;
    meta_title: string;
    meta_description: string;
  };
}

export function EditorSidebar({
  rightPanel,
  setRightPanel,
  showRight,
  setShowRight,
  settings,
  setSettings,
  handleTitle,
  setIsDirty,
  initialSettings,
}: EditorSidebarProps) {
  const selectedBlockClientId = useSelect(
    (select) => select(blockEditorStore).getSelectedBlockClientId(),
    [],
  );

  const prevIdRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (selectedBlockClientId && selectedBlockClientId !== prevIdRef.current) {
      setRightPanel("block");
      setShowRight(true);
    }

    prevIdRef.current = selectedBlockClientId;
  }, [selectedBlockClientId, setRightPanel, setShowRight]);

  if (!showRight) return null;

  return (
    <div
      style={{
        width: "280px",
        minWidth: "280px",
        flexShrink: 0,
        borderLeft: "1px solid var(--border-color)",
        background: "var(--fg-color)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minHeight: 0,
        borderStyle: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          height: "50px",
          minHeight: "36px",
          flexShrink: 0,
          borderStyle: "none",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {["page", "block"].map((tab) => (
          <button
            key={tab}
            onClick={() => setRightPanel(tab as RightPanel)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom:
                rightPanel === tab ? "2px solid var(--text-color)" : "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color:
                rightPanel === tab ? "var(--text-color)" : "var(--text-muted)",
              padding: "0 10px",
              marginRight: "10px",
              height: "100%",
              transition: "all 0.1s ease",
            }}
          >
            {tab === "page" ? "Page" : "Block"}
          </button>
        ))}
        <CloseButton onClick={() => setShowRight(false)} />
      </div>

      {/* Tab Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: 0,
        }}
      >
        {rightPanel === "block" ? (
          <BlockInspector />
        ) : (
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Page Title */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Title
              </label>
              <input
                type="text"
                className="form-control"
                value={settings.title}
                onChange={handleTitle}
                style={{ width: "100%" }}
              />
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid var(--border-color)",
                margin: "0",
              }}
            />

            {/* Published Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{ fontSize: "13px", cursor: "pointer" }}
                htmlFor="page-published"
              >
                Published
              </label>
              <input
                type="checkbox"
                id="page-published"
                style={{ width: "16px", height: "16px" }}
                value={settings.published}
                checked={settings.published === 1}
                onChange={(e) => {
                  setSettings((s) => ({
                    ...s,
                    published: e.target.checked ? 1 : 0,
                  }));
                  setIsDirty(
                    (e.target.checked ? 1 : 0) !== initialSettings.published,
                  );
                }}
              />
            </div>

            {/* URL Slug */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Route (Slug)
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                }}
              >
                <span>/</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="page-slug"
                  style={{ flex: 1 }}
                  value={settings.route}
                  onChange={(e) => {
                    setSettings((s) => ({ ...s, route: e.target.value }));
                    setIsDirty(e.target.value !== initialSettings.route);
                  }}
                />
              </div>
            </div>

            {/* SEO Meta Title */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Meta Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="SEO Title..."
                style={{ width: "100%" }}
                value={settings.meta_title}
                onChange={(e) => {
                  setSettings((s) => ({ ...s, meta_title: e.target.value }));
                  setIsDirty(e.target.value !== initialSettings.meta_title);
                }}
              />
            </div>

            {/* SEO Meta Description */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Meta Description
              </label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="SEO Description..."
                style={{
                  width: "100%",
                  resize: "none",
                  fontSize: "13px",
                }}
                value={settings.meta_description}
                onChange={(e) => {
                  setSettings((s) => ({
                    ...s,
                    meta_description: e.target.value,
                  }));
                  setIsDirty(
                    e.target.value !== initialSettings.meta_description,
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
