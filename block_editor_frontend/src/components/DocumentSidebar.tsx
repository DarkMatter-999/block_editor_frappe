import {
  // @ts-expect-error - not yet in types
  __experimentalListView as ListView,
  // @ts-expect-error - not yet in types
  __experimentalLibrary as BlockLibrary,
} from "@wordpress/block-editor";
import { SidebarHeading } from "./SidebarHeading";
import { CloseButton } from "./CloseButton";

type LeftPanel = "inserter" | "overview" | null;

interface LeftSidebarProps {
  leftPanel: LeftPanel;
  setLeftPanel: (panel: LeftPanel) => void;
}

export function DocumentSidebar({ leftPanel, setLeftPanel }: LeftSidebarProps) {
  if (leftPanel === null) return null;

  return (
    <div
      style={{
        width: "350px",
        minWidth: "350px",
        flexShrink: 0,
        borderRight: "1px solid var(--border-color)",
        background: "var(--fg-color)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderStyle: "none",
        minHeight: 0,
      }}
    >
      {leftPanel === "overview" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "10px",
            borderStyle: "none",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div style={{ flex: 1 }}>
            <SidebarHeading label={"Document overview"} />
          </div>
          <CloseButton onClick={() => setLeftPanel(null)} />
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: leftPanel === "inserter" ? "block" : "none",
            height: "100%",
          }}
        >
          <BlockLibrary showMostUsedBlocks onClose={() => setLeftPanel(null)} />
        </div>

        <div
          style={{
            display: leftPanel === "overview" ? "block" : "none",
            padding: "4px 0",
          }}
        >
          <ListView />
        </div>
      </div>
    </div>
  );
}
